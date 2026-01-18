
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Build from './pages/Build';
import Automate from './pages/Automate';
import Lab from './pages/Lab';
import AppBuilder from './pages/AppBuilder';
import Ecommerce from './pages/Ecommerce';
import Capital from './pages/Capital';
import MemeLab from './pages/MemeLab';
import MusicLab from './pages/MusicLab';
import Pricing from './pages/Pricing';
import Notifications from './pages/Notifications';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Settings from './pages/Settings';
import Support from './pages/Support';
import SubmitTrack from './pages/SubmitTrack';
import { notificationService } from './services/notificationService';
import { creditService } from './services/creditService';
import { walletService, WalletState } from './services/walletService';

const Navigation = () => {
  const location = useLocation();
  const currentPath = location.pathname.split('/')[1] || 'home';
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    return notificationService.subscribe((notifications) => {
      setUnreadCount(notifications.filter(n => !n.read).length);
    });
  }, []);

  const navItems = [
    { label: 'Home', path: '/', icon: '🏛️', id: 'home' },
    { label: 'Asset', path: '/build', icon: '⚡', id: 'build' },
    { label: 'Music', path: '/music-lab', icon: '🎙️', id: 'music-lab' },
    { label: 'Plans', path: '/pricing', icon: '💎', id: 'pricing' },
    { label: 'Capital', path: '/capital', icon: '💰', id: 'capital' },
    { label: 'Inbox', path: '/notifications', icon: '🔔', id: 'notifications', badge: unreadCount },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-white/5" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="flex justify-around items-center h-20 max-w-lg mx-auto px-6">
        {navItems.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className={`relative flex flex-col items-center justify-center transition-all duration-300 ${
              (currentPath === item.id || (item.id === 'home' && currentPath === '')) ? 'text-[#00e0a4] scale-110' : 'text-white/40 hover:text-white'
            }`}
          >
            <span className="text-2xl mb-1">{item.icon}</span>
            <span className="text-[9px] font-black uppercase tracking-[0.2em]">{item.label}</span>
            {item.badge > 0 && (
              <span className="absolute top-0 right-0 -mr-2 bg-red-500 text-white text-[8px] font-black w-4 h-4 flex items-center justify-center rounded-full border-2 border-[#0b0b0c]">
                {item.badge}
              </span>
            )}
          </Link>
        ))}
      </div>
    </nav>
  );
};

const Header = () => {
  const [credits, setCredits] = useState(0);
  const [wallet, setWallet] = useState<WalletState>(walletService.getState());

  useEffect(() => {
    const unsubCredits = creditService.subscribe(setCredits);
    const unsubWallet = walletService.subscribe(setWallet);
    return () => {
      unsubCredits();
      unsubWallet();
    };
  }, []);

  const truncateAddress = (addr: string) => `${addr.slice(0, 4)}...${addr.slice(-4)}`;

  return (
    <header className="sticky top-0 z-40 glass border-b border-white/5 px-6 py-5" style={{ paddingTop: 'calc(1.25rem + env(safe-area-inset-top))' }}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
           <Link to="/" className="text-2xl font-black tracking-tighter">
            ANAI<span className="text-[#00e0a4]">.ai</span>
          </Link>
          <div className="hidden lg:flex gap-3 ml-4">
            <Link to="/settings" className="text-[10px] font-black text-white/20 hover:text-white uppercase tracking-widest">Settings</Link>
            <Link to="/support" className="text-[10px] font-black text-white/20 hover:text-white uppercase tracking-widest">Support</Link>
          </div>
        </div>
        
        <div className="flex gap-4 items-center">
          <div className="hidden sm:flex bg-white/5 border border-white/10 px-4 py-2 rounded-xl items-center gap-3">
             <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">Bank</span>
             <span className="text-xs font-black text-[#00e0a4]">{credits === 999 ? '∞' : credits} <span className="text-[8px] opacity-40">CREDITS</span></span>
          </div>

          {wallet.isConnected ? (
            <div className="bg-[#00e0a4]/10 border border-[#00e0a4]/20 px-4 py-2 rounded-xl flex items-center gap-3 transition-all">
              <span className="w-1.5 h-1.5 bg-[#00e0a4] rounded-full animate-pulse" />
              <span className="text-[10px] font-black text-[#00e0a4] uppercase tracking-wider">{truncateAddress(wallet.address!)}</span>
            </div>
          ) : (
            <button 
              onClick={() => walletService.connect()}
              className="bg-white/5 border border-white/10 text-white/60 px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-white hover:text-black transition-all"
            >
              Connect
            </button>
          )}

          <Link to="/pricing" className="bg-[#00e0a4] text-[#041b14] px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-white transition-all shadow-xl shadow-[#00e0a4]/10">
            Top Up
          </Link>
        </div>
      </div>
    </header>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pb-32">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/build" element={<Build />} />
            <Route path="/app-builder" element={<AppBuilder />} />
            <Route path="/ecommerce" element={<Ecommerce />} />
            <Route path="/capital" element={<Capital />} />
            <Route path="/meme-lab" element={<MemeLab />} />
            <Route path="/music-lab" element={<MusicLab />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/automate" element={<Automate />} />
            <Route path="/lab" element={<Lab />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/support" element={<Support />} />
            <Route path="/submit-track" element={<SubmitTrack />} />
          </Routes>
        </main>
        <Navigation />
      </div>
    </Router>
  );
};

export default App;
