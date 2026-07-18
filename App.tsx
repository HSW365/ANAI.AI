import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';

import Home from './pages/Home';
import Build from './pages/Build';
import AppBuilder from './pages/AppBuilder';
import MusicLab from './pages/MusicLab';
import MemeLab from './pages/MemeLab';
import Capital from './pages/Capital';
import Ecommerce from './pages/Ecommerce';
import AILab from './pages/AILab';
import Lab from './pages/Lab';
import Automate from './pages/Automate';
import Booking from './pages/Booking';
import Merch from './pages/Merch';
import Podcast from './pages/Podcast';
import Pricing from './pages/Pricing';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';
import Support from './pages/Support';
import SubmitTrack from './pages/SubmitTrack';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

const NAV_LINKS: { label: string; to: string }[] = [
  { label: 'Home', to: '/' },
  { label: 'Build', to: '/build' },
  { label: 'App Architect', to: '/app-builder' },
  { label: 'Music Lab', to: '/music-lab' },
  { label: 'Meme Forge', to: '/meme-lab' },
  { label: 'Capital', to: '/capital' },
  { label: 'Commerce', to: '/ecommerce' },
  { label: 'Pricing', to: '/pricing' },
];

const TopNav: React.FC = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#0a0a0f]/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-lg font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#00e0a4] to-white">
          ANAI.ai
        </Link>
        <nav className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-[10px] font-black uppercase tracking-widest transition-colors ${
                location.pathname === link.to ? 'text-[#00e0a4]' : 'text-white/40 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:flex items-center gap-4">
          <Link to="/settings" className="text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors">
            Settings
          </Link>
        </div>
        <button
          onClick={() => setOpen(o => !o)}
          className="lg:hidden text-white/60 hover:text-white p-2"
          aria-label="Toggle menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      {open && (
        <nav className="lg:hidden border-t border-white/5 px-6 py-4 flex flex-col gap-4">
          {[...NAV_LINKS, { label: 'Settings', to: '/settings' }].map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={`text-xs font-black uppercase tracking-widest ${
                location.pathname === link.to ? 'text-[#00e0a4]' : 'text-white/50'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

const AppShell: React.FC = () => (
  <div className="min-h-screen bg-[#0a0a0f] text-white font-sans overflow-y-auto">
    <TopNav />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/build" element={<Build />} />
      <Route path="/app-builder" element={<AppBuilder />} />
      <Route path="/music-lab" element={<MusicLab />} />
      <Route path="/meme-lab" element={<MemeLab />} />
      <Route path="/capital" element={<Capital />} />
      <Route path="/ecommerce" element={<Ecommerce />} />
      <Route path="/ai-lab" element={<AILab />} />
      <Route path="/lab" element={<Lab />} />
      <Route path="/automate" element={<Automate />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/merch" element={<Merch />} />
      <Route path="/podcast" element={<Podcast />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/support" element={<Support />} />
      <Route path="/submit-track" element={<SubmitTrack />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="*" element={<Home />} />
    </Routes>
  </div>
);

// NOTE: KeyGate.tsx targets window.aistudio.* — a Google AI Studio preview-only
// API that does not exist in the deployed web/iOS/Android build. All Gemini
// calls now go through /server (see services/geminiService.ts) so no client-side
// key or gate is needed here. Left in components/ in case a bring-your-own-key
// flow is wanted later behind a feature flag.
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
};

export default App;
