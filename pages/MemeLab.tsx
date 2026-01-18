
import React, { useState, useEffect } from 'react';
import { generateTokenBlueprint } from '../services/geminiService';
import { creditService } from '../services/creditService';
import { walletService, WalletState } from '../services/walletService';
import { useNavigate } from 'react-router-dom';

const MemeLab: React.FC = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'forge' | 'guide' | 'anai'>('forge');
  const [loading, setLoading] = useState(false);
  const [blueprint, setBlueprint] = useState<any>(null);
  const [wallet, setWallet] = useState<WalletState>(walletService.getState());

  useEffect(() => {
    return walletService.subscribe(setWallet);
  }, []);

  // Forge state
  const [concept, setConcept] = useState('');
  const [chain, setChain] = useState<'solana' | 'base' | 'ethereum'>('solana');

  const handleForge = async () => {
    if (!concept) return;

    if (!wallet.isConnected) {
      alert("Neural Bridge Error: Wallet Connection Required to sign asset metadata.");
      await walletService.connect();
      return;
    }

    if (creditService.getCredits() <= 0) {
      alert("Neural Bank Depleted. Please Top Up.");
      navigate('/pricing');
      return;
    }

    setLoading(true);
    try {
      const data = await generateTokenBlueprint(concept, chain);
      creditService.consumeCredit();
      setBlueprint(data);
    } catch (e) {
      alert("Neural Forge Busy.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-6 py-12 max-w-6xl mx-auto">
      <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-5xl font-black uppercase tracking-tighter mb-4">UTILITY <span className="text-[#00e0a4]">FORGE</span></h1>
          <p className="text-white/50 font-medium uppercase tracking-[0.2em] text-xs">Architect & Deploy High-Impact Digital Assets</p>
        </div>
        <div className="flex bg-[#121216] p-1 rounded-xl border border-white/5 overflow-x-auto">
          {['forge', 'guide', 'anai'].map((t) => (
            <button 
              key={t}
              onClick={() => { setTab(t as any); setBlueprint(null); }}
              className={`px-5 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${tab === t ? 'bg-[#00e0a4] text-black' : 'text-white/40 hover:text-white'}`}
            >
              {t === 'anai' ? '$ANAI Utility' : t === 'guide' ? 'Network Protocol' : 'Neural Forge'}
            </button>
          ))}
        </div>
      </div>

      {tab === 'forge' ? (
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#121216] border border-white/5 p-10 rounded-[40px] space-y-8 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#00e0a4]/10 blur-[80px] rounded-full" />
              <div className="flex justify-between items-center relative z-10">
                <h3 className="text-xl font-black uppercase tracking-tighter">Neural Architect</h3>
                {!wallet.isConnected && (
                  <span className="text-[8px] font-black bg-red-500/10 text-red-400 px-2 py-1 rounded-md uppercase tracking-widest border border-red-500/20">Offline</span>
                )}
              </div>
              
              <div className="space-y-6 relative z-10">
                <div>
                  <label className="block text-[10px] font-black uppercase text-white/40 mb-3 tracking-widest">Network / Chain</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['solana', 'base', 'ethereum'].map(c => (
                      <button 
                        key={c}
                        onClick={() => setChain(c as any)}
                        className={`py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border ${chain === c ? 'bg-[#00e0a4] text-black border-transparent' : 'bg-white/5 text-white/40 border-white/5'}`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-white/40 mb-3 tracking-widest">Digital Asset Concept / Vibe</label>
                  <textarea 
                    value={concept} onChange={e => setConcept(e.target.value)}
                    className="w-full bg-[#0b0b0c] border border-white/5 p-6 rounded-2xl focus:border-[#00e0a4] outline-none text-sm font-medium leading-relaxed min-h-[150px]"
                    placeholder="e.g. A utility token for an indie creator community on Solana..."
                  />
                </div>

                {!wallet.isConnected ? (
                  <button 
                    onClick={() => walletService.connect()}
                    className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-[#00e0a4] transition-all shadow-xl"
                  >
                    Connect Wallet to Architect
                  </button>
                ) : (
                  <button 
                    onClick={handleForge} disabled={loading || !concept}
                    className="w-full bg-[#00e0a4] text-[#041b14] py-5 rounded-2xl font-black uppercase tracking-tighter hover:bg-white transition-all disabled:opacity-50 shadow-xl"
                  >
                    {loading ? 'ARCHITECTING METADATA...' : 'GENERATE ASSET BLUEPRINT (1 CREDIT)'}
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            {!blueprint ? (
              <div className="bg-[#121216]/40 p-12 rounded-[40px] border border-dashed border-white/5 text-center flex flex-col items-center justify-center min-h-[500px]">
                <span className="text-6xl mb-6">💎</span>
                <p className="text-white/20 font-black uppercase tracking-widest text-xs">Asset Neural Stream Standby.</p>
              </div>
            ) : (
              <div className="space-y-8 animate-in zoom-in duration-500">
                <div className="bg-[#121216] border border-white/5 p-10 rounded-[40px] relative overflow-hidden shadow-2xl">
                   <div className="absolute -top-10 -right-10 text-[180px] font-black opacity-[0.03] select-none tracking-tighter">
                      {blueprint.symbol}
                   </div>
                   <div className="mb-10 flex justify-between items-end border-b border-white/5 pb-8">
                      <div>
                        <h3 className="text-xs font-black uppercase text-[#00e0a4] tracking-[0.4em] mb-4">Neural Architecture v1</h3>
                        <h2 className="text-5xl font-black uppercase tracking-tighter text-white">{blueprint.name}</h2>
                        <p className="text-xl font-bold text-white/40">${blueprint.symbol}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-1">Max Supply</p>
                        <p className="text-lg font-black text-white">1,000,000,000</p>
                      </div>
                   </div>

                   <div className="grid gap-10">
                      <section>
                        <h4 className="text-[10px] font-black uppercase text-white/30 mb-4 tracking-widest">The Lore</h4>
                        <p className="text-sm text-white/60 leading-relaxed font-medium bg-[#0b0b0c] p-6 rounded-2xl border border-white/5 italic">"{blueprint.lore}"</p>
                      </section>

                      <section>
                        <h4 className="text-[10px] font-black uppercase text-white/30 mb-6 tracking-widest">Asset Distribution</h4>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                           {blueprint.distribution.map((d: any, i: number) => (
                             <div key={i} className="bg-[#0b0b0c] p-4 rounded-xl border border-white/5 text-center">
                                <p className="text-[8px] font-black text-white/20 uppercase tracking-widest mb-2">{d.label}</p>
                                <p className="text-xl font-black text-[#00e0a4]">{d.percentage}</p>
                             </div>
                           ))}
                        </div>
                      </section>

                      <div className="grid md:grid-cols-2 gap-8">
                         <section>
                            <h4 className="text-[10px] font-black uppercase text-white/30 mb-4 tracking-widest">Network Protocol</h4>
                            <div className="p-5 bg-white/5 rounded-2xl border border-white/10 text-xs font-bold text-white/80">
                               {blueprint.taxes}
                            </div>
                         </section>
                         <section>
                            <h4 className="text-[10px] font-black uppercase text-white/30 mb-4 tracking-widest">Viral Hook</h4>
                            <div className="p-5 bg-[#00e0a4]/5 rounded-2xl border border-[#00e0a4]/10 text-xs font-black text-[#00e0a4]">
                               {blueprint.hook}
                            </div>
                         </section>
                      </div>

                      <section className="pt-8 border-t border-white/5">
                        <h4 className="text-[10px] font-black uppercase text-white/30 mb-4 tracking-widest">Ecosystem Utility</h4>
                        <p className="text-xs text-white/40 leading-relaxed font-bold uppercase tracking-tight">{blueprint.utility}</p>
                      </section>
                   </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : tab === 'guide' ? (
        <div className="space-y-12 animate-in fade-in duration-500">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">The Network <span className="text-[#00e0a4]">Protocol</span></h2>
            <p className="text-white/50 text-sm font-medium uppercase tracking-widest leading-relaxed">
              From Neural Blueprint to Digital Liquidity. Follow the Master Protocol to list your asset on digital distribution platforms.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
             {[
               { step: '01', title: 'Contract Deploy', desc: 'Use Remix (ETH/Base) or Smithii (Solana) to deploy your signed contract. Verify the source code on blockchain explorers.', icon: '📜' },
               { step: '02', title: 'Liquidity Protocol', desc: 'Secure 80% of supply in a Liquidity Pool (LP) on decentralized platforms. Use locking tools to ensure network stability.', icon: '🔒' },
               { step: '03', title: 'Network Visibility', desc: 'Apply for enhanced listing status. Upload social metadata and project URLs for verified status.', icon: '📊' },
               { step: '04', title: 'Strategic Seeding', desc: 'Deploy the Neural Hooks generated in the Forge across digital communities. Execute high-impact viral campaigns.', icon: '🚀' },
               { step: '05', title: 'Distribution Apps', desc: 'Once reaching growth targets, apply for secondary market distribution hubs. Scale your creator footprint.', icon: '🏛️' },
               { step: '06', title: 'Ecosystem Governance', desc: 'Transition ownership to a community structure. Use $ANAI.ai utility to stabilize long-term growth floor.', icon: '⚖️' }
             ].map((s, i) => (
               <div key={i} className="bg-[#121216] border border-white/5 p-8 rounded-[32px] group hover:border-[#00e0a4]/30 transition-all">
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-3xl group-hover:scale-110 transition-transform">{s.icon}</span>
                    <span className="text-xs font-black text-white/20 uppercase tracking-[0.3em]">Phase {s.step}</span>
                  </div>
                  <h4 className="text-lg font-black uppercase tracking-tighter mb-3">{s.title}</h4>
                  <p className="text-white/40 text-[11px] leading-relaxed uppercase font-bold tracking-tight">{s.desc}</p>
               </div>
             ))}
          </div>
          
          <div className="bg-[#121216] p-12 rounded-[48px] border border-white/5 text-center max-w-4xl mx-auto">
             <h3 className="text-2xl font-black uppercase mb-6 tracking-tighter">Ready to Deploy?</h3>
             <div className="flex flex-wrap justify-center gap-4">
                <a href="https://pinksale.finance" target="_blank" className="bg-white text-black px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-[#00e0a4] transition-all">Network Launchpad</a>
                <a href="https://dexscreener.com" target="_blank" className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-white/10 transition-all">Distribution App</a>
             </div>
          </div>
        </div>
      ) : (
        <div className="space-y-16 animate-in fade-in duration-500">
           <div className="bg-[#121216] border border-white/5 rounded-[60px] p-16 relative overflow-hidden flex flex-col lg:flex-row items-center gap-16 shadow-2xl">
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-[#00e0a4]/5 via-transparent to-transparent pointer-events-none" />
              <div className="lg:flex-1 relative z-10">
                <div className="inline-block px-4 py-2 bg-[#00e0a4]/10 text-[#00e0a4] rounded-full text-[10px] font-black uppercase tracking-widest mb-8 border border-[#00e0a4]/20">
                   Official Platform Utility
                </div>
                <h2 className="text-7xl font-black uppercase tracking-tighter mb-8 leading-none text-white">
                  THE <span className="text-[#00e0a4]">$ANAI</span> <br/>ECOSYSTEM
                </h2>
                <p className="text-xl text-white/40 leading-relaxed font-bold uppercase tracking-tight mb-12">
                  The engine behind the empire. $ANAI is the native utility of the ANAI.ai platform, designed to power every neural generation and creation task.
                </p>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="flex gap-4">
                    <span className="text-2xl text-[#00e0a4]">✔</span>
                    <div>
                      <h4 className="font-bold text-white mb-1 uppercase tracking-widest text-xs">Neural Utility</h4>
                      <p className="text-white/30 text-[10px] font-bold uppercase">Use $ANAI for unlimited digital blueprints.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-2xl text-[#00e0a4]">✔</span>
                    <div>
                      <h4 className="font-bold text-white mb-1 uppercase tracking-widest text-xs">Burn Protocol</h4>
                      <p className="text-white/30 text-[10px] font-bold uppercase">1% of all platform fees are recycled monthly.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:flex-1 relative z-10">
                <div className="bg-[#0b0b0c] p-10 rounded-[48px] border border-white/5 shadow-inner">
                  <div className="text-center mb-10">
                    <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-2">Target Network Pool</p>
                    <p className="text-5xl font-black text-white tracking-tighter">1,000,000,000 <span className="text-white/20">ANAI</span></p>
                  </div>
                  <div className="space-y-4 mb-10">
                    {[
                      { label: 'Platform Utility', val: '40%' },
                      { label: 'Public Release', val: '25%' },
                      { label: 'Network Stability', val: '20%' },
                      { label: 'Core Development', val: '15%' }
                    ].map((row, i) => (
                      <div key={i} className="flex justify-between items-center py-3 border-b border-white/5 last:border-0">
                        <span className="text-[10px] font-black uppercase text-white/40">{row.label}</span>
                        <span className="text-xs font-black text-[#00e0a4]">{row.val}</span>
                      </div>
                    ))}
                  </div>
                  <button className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-[#00e0a4] transition-all">Join Early Access</button>
                </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default MemeLab;
