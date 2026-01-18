
import React, { useState, useEffect } from 'react';
import { generateVentureThesis } from '../services/geminiService';
import { creditService } from '../services/creditService';
import { walletService, WalletState } from '../services/walletService';
import { useNavigate } from 'react-router-dom';

const Capital: React.FC = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'strategy' | 'support'>('strategy');
  const [loading, setLoading] = useState(false);
  const [thesis, setThesis] = useState<any>(null);
  const [wallet, setWallet] = useState<WalletState>(walletService.getState());

  useEffect(() => {
    return walletService.subscribe(setWallet);
  }, []);

  // Strategy State
  const [pName, setPName] = useState('');
  const [vision, setVision] = useState('');

  const handleGenerateStrategy = async () => {
    if (!pName || !vision) return;

    if (creditService.getCredits() <= 0) {
      alert("Neural Bank Depleted. Please Top Up.");
      navigate('/pricing');
      return;
    }

    setLoading(true);
    try {
      // Internal service still named generateVentureThesis but framed as Strategy Roadmap
      const data = await generateVentureThesis(pName, vision);
      creditService.consumeCredit();
      setThesis(data);
    } catch (e) {
      alert("Strategy engine busy.");
    } finally {
      setLoading(false);
    }
  };

  const handleSupport = (amount: string, tier: string) => {
    if (wallet.isConnected) {
      alert(`Initiating Secure Utility Contribution for ${tier} tier (${amount})... Please confirm in your wallet.`);
    } else {
      alert(`Redirecting to Secure $HSW365 Stripe Gateway for ${amount}... Connect your wallet for direct digital asset support.`);
    }
  };

  return (
    <div className="px-6 py-12 max-w-6xl mx-auto">
      <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-5xl font-black uppercase tracking-tighter mb-4">STRATEGY <span className="text-[#00e0a4]">HUB</span></h1>
          <p className="text-white/50 font-medium uppercase tracking-[0.2em] text-xs">The Engine for Digital Asset Growth & Strategic Scaling</p>
        </div>
        <div className="flex bg-[#121216] p-1 rounded-xl border border-white/5">
          <button 
            onClick={() => { setTab('strategy'); setThesis(null); }}
            className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${tab === 'strategy' ? 'bg-[#00e0a4] text-black' : 'text-white/40 hover:text-white'}`}
          >
            Growth Roadmap
          </button>
          <button 
            onClick={() => { setTab('support'); setThesis(null); }}
            className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${tab === 'support' ? 'bg-[#00e0a4] text-black' : 'text-white/40 hover:text-white'}`}
          >
            Network Support
          </button>
        </div>
      </div>

      {tab === 'strategy' ? (
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#121216] border border-white/5 p-10 rounded-[40px] space-y-8 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#00e0a4]/5 blur-[60px] rounded-full" />
               <h3 className="text-xl font-black uppercase tracking-tighter">Generate Growth Roadmap</h3>
               <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-white/40 mb-3 tracking-widest">Brand / Project Name</label>
                    <input 
                      value={pName} onChange={e => setPName(e.target.value)}
                      className="w-full bg-[#0b0b0c] border border-white/5 p-4 rounded-xl focus:border-[#00e0a4] outline-none text-sm font-medium"
                      placeholder="e.g. Neo-Culture Media"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-white/40 mb-3 tracking-widest">Growth Vision & Impact</label>
                    <textarea 
                      value={vision} onChange={e => setVision(e.target.value)}
                      className="w-full bg-[#0b0b0c] border border-white/5 p-4 rounded-xl focus:border-[#00e0a4] outline-none text-sm font-medium min-h-[150px]"
                      placeholder="e.g. To democratize high-end brand assets for every indie creator globally using neural networks..."
                    />
                  </div>
                  <button 
                    onClick={handleGenerateStrategy} disabled={loading || !pName}
                    className="w-full bg-[#00e0a4] text-[#041b14] py-5 rounded-2xl font-black uppercase tracking-tighter hover:bg-white transition-all disabled:opacity-50 shadow-xl"
                  >
                    {loading ? 'ANALYZING MARKET...' : 'DEPLOY STRATEGY AGENTS (1 CREDIT)'}
                  </button>
               </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            {!thesis ? (
              <div className="bg-[#121216]/40 p-12 rounded-[40px] border border-dashed border-white/5 text-center flex flex-col items-center justify-center min-h-[500px]">
                <span className="text-6xl mb-6">📉</span>
                <p className="text-white/20 font-black uppercase tracking-widest text-xs">Strategy Neural Cluster Standby.</p>
              </div>
            ) : (
              <div className="space-y-8 animate-in slide-in-from-right duration-500">
                <div className="bg-[#121216] border border-white/5 p-10 rounded-[40px] relative overflow-hidden">
                   <div className="absolute -top-10 -right-10 text-[180px] font-black opacity-[0.03] select-none tracking-tighter">
                      ROADMAP
                   </div>
                   <div className="mb-10">
                      <h2 className="text-xs font-black uppercase text-[#00e0a4] tracking-[0.4em] mb-4">Strategic Growth Blueprint</h2>
                      <h3 className="text-4xl font-black uppercase tracking-tighter text-white">{pName}</h3>
                   </div>

                   <div className="space-y-8">
                      <section>
                        <h4 className="text-[10px] font-black uppercase text-white/30 mb-4 tracking-widest">Market Opportunity</h4>
                        <p className="text-sm text-white/70 leading-relaxed font-medium">{thesis.opportunity}</p>
                      </section>

                      <section>
                        <h4 className="text-[10px] font-black uppercase text-white/30 mb-4 tracking-widest">Competitive Moat</h4>
                        <p className="text-sm text-white/70 leading-relaxed font-medium">{thesis.theMoat}</p>
                      </section>

                      <div className="grid md:grid-cols-2 gap-8">
                         <section>
                            <h4 className="text-[10px] font-black uppercase text-white/30 mb-4 tracking-widest">Growth Milestones</h4>
                            <ul className="space-y-3">
                              {thesis.roadmap.map((r: string, i: number) => (
                                <li key={i} className="flex gap-3 text-[11px] font-bold text-white/50 uppercase">
                                  <span className="text-[#00e0a4]">→</span> {r}
                                </li>
                              ))}
                            </ul>
                         </section>
                         <section>
                            <h4 className="text-[10px] font-black uppercase text-white/30 mb-4 tracking-widest">Resource Allocation</h4>
                            <div className="p-5 bg-[#00e0a4]/5 border border-[#00e0a4]/10 rounded-2xl text-sm font-black text-[#00e0a4]">
                               {thesis.investmentAsk}
                            </div>
                         </section>
                      </div>

                      <section className="pt-8 border-t border-white/5">
                        <h4 className="text-[10px] font-black uppercase text-white/30 mb-2 tracking-widest">Ecosystem Impact</h4>
                        <p className="text-xs text-white/40 italic leading-relaxed">{thesis.impact}</p>
                      </section>
                   </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-12 animate-in fade-in duration-500">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">Support the <span className="text-[#00e0a4]">$HSW365</span> Network</h2>
            <p className="text-white/50 text-sm font-medium uppercase tracking-widest leading-relaxed">
              Directly contribute to the development of ANAI.ai and the success of indie creators in our digital ecosystem. Every credit powers the neural engine.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { tier: 'Supporter', price: '$10', icon: '🌱', desc: 'Power 1,000 neural utility tasks for the community.', credits: '100 $HSW365' },
              { tier: 'Advocate', price: '$50', icon: '🔥', desc: 'Sponsor a podcast episode spotlight for a rising digital creator.', credits: '600 $HSW365' },
              { tier: 'Partner', price: '$250', icon: '🏢', desc: 'Direct contribution to the Creator Architect development fund.', credits: '3,500 $HSW365' }
            ].map((d, i) => (
              <div key={i} className="bg-[#121216] border border-white/5 p-10 rounded-[40px] text-center group hover:border-[#00e0a4]/40 transition-all">
                <span className="text-5xl mb-6 block group-hover:scale-110 transition-transform">{d.icon}</span>
                <h4 className="text-xs font-black uppercase text-white/40 mb-1 tracking-widest">{d.tier}</h4>
                <p className="text-4xl font-black text-white mb-6 tracking-tighter">{d.price}</p>
                <p className="text-xs text-white/50 leading-relaxed mb-10 font-medium px-4">{d.desc}</p>
                <div className="mb-10 text-[10px] font-black uppercase text-[#00e0a4] tracking-[0.2em]">{d.credits}</div>
                
                {wallet.isConnected ? (
                  <button 
                    onClick={() => handleSupport(d.price, d.tier)}
                    className="w-full bg-[#00e0a4] text-black py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-white transition-all shadow-lg shadow-[#00e0a4]/10"
                  >
                    Use Wallet
                  </button>
                ) : (
                  <button 
                    onClick={() => handleSupport(d.price, d.tier)}
                    className="w-full bg-white text-black py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-[#00e0a4] transition-all"
                  >
                    Support Hub
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="bg-[#121216] p-12 rounded-[48px] border border-white/5 flex flex-col md:flex-row items-center gap-12 max-w-4xl mx-auto">
             <div className="flex-1">
               <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">The $HSW365 Commitment</h3>
               <p className="text-white/40 text-sm leading-relaxed mb-6 font-medium">
                 We are committed to building a digital-first economy. Support goes directly toward infrastructure, creator tools, and hardware that keeps the platform independent from corporate algorithms.
               </p>
               <div className="flex gap-4">
                  <div className="bg-[#00e0a4]/10 text-[#00e0a4] px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">100% Transparent</div>
                  <div className="bg-white/5 text-white/40 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">Creator Owned</div>
               </div>
             </div>
             <div className="text-8xl select-none opacity-20">🛡️</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Capital;
