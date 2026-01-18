
import React, { useState } from 'react';
import { generateAppBlueprint } from '../services/geminiService';
import { creditService } from '../services/creditService';
import { useNavigate } from 'react-router-dom';

const StepCard: React.FC<{ number: string; title: string; desc: string; store: 'apple' | 'google' }> = ({ number, title, desc, store }) => (
  <div className="bg-[#0b0b0c] p-6 rounded-2xl border border-white/5 group hover:border-[#00e0a4]/20 transition-all">
    <div className="flex items-center gap-3 mb-3">
      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black ${store === 'apple' ? 'bg-white text-black' : 'bg-[#00e0a4] text-black'}`}>
        {number}
      </span>
      <h4 className="text-xs font-black uppercase tracking-widest text-white/80">{title}</h4>
    </div>
    <p className="text-white/40 text-[11px] leading-relaxed uppercase font-bold tracking-tight">{desc}</p>
  </div>
);

const AppBuilder: React.FC = () => {
  const navigate = useNavigate();
  const [idea, setIdea] = useState('');
  const [loading, setLoading] = useState(false);
  const [blueprint, setBlueprint] = useState<any>(null);
  const [tab, setTab] = useState<'architect' | 'guide'>('architect');

  const handleArchitect = async () => {
    if (!idea) return;

    if (creditService.getCredits() <= 0) {
      alert("Neural Bank Depleted. Please Top Up.");
      navigate('/pricing');
      return;
    }

    setLoading(true);
    try {
      const data = await generateAppBlueprint(idea);
      creditService.consumeCredit();
      setBlueprint(data);
    } catch (e) {
      alert("Neural Overload. Please retry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-6 py-12 max-w-6xl mx-auto">
      <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-5xl font-black uppercase tracking-tighter mb-4">NEURAL <span className="text-[#00e0a4]">ARCHITECT</span></h1>
          <p className="text-white/50 font-medium uppercase tracking-[0.2em] text-xs">Architect Full Mobile Systems via AI</p>
        </div>
        <div className="flex bg-[#121216] p-1 rounded-xl border border-white/5">
          <button 
            onClick={() => setTab('architect')}
            className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${tab === 'architect' ? 'bg-[#00e0a4] text-black' : 'text-white/40 hover:text-white'}`}
          >
            Builder
          </button>
          <button 
            onClick={() => setTab('guide')}
            className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${tab === 'guide' ? 'bg-[#00e0a4] text-black' : 'text-white/40 hover:text-white'}`}
          >
            Store Guide
          </button>
        </div>
      </div>

      {tab === 'architect' ? (
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#121216] border border-white/5 p-10 rounded-[40px] space-y-8">
              <h3 className="text-xl font-black uppercase tracking-tighter">App Command</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black uppercase text-white/40 mb-3 tracking-widest">App Concept / Idea</label>
                  <textarea 
                    value={idea}
                    // Fixed the nested setIdea call to avoid "Argument of type 'void' is not assignable to parameter of type 'SetStateAction<string>'" error
                    onChange={(e) => setIdea(e.target.value)}
                    className="w-full bg-[#0b0b0c] border border-white/5 p-6 rounded-2xl focus:border-[#00e0a4] outline-none min-h-[200px] text-sm font-medium leading-relaxed"
                    placeholder="e.g. A marketplace for indie fashion designers with AR try-on features..."
                  />
                </div>
                <button 
                  onClick={handleArchitect}
                  disabled={loading || !idea}
                  className="w-full bg-[#00e0a4] text-[#041b14] py-5 rounded-2xl font-black uppercase tracking-tighter hover:bg-white transition-all disabled:opacity-50 shadow-xl"
                >
                  {loading ? 'CALCULATING ARCHITECTURE...' : 'GENERATE SYSTEM (1 CREDIT)'}
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            {!blueprint ? (
              <div className="bg-[#121216]/40 p-12 rounded-[40px] border border-dashed border-white/5 text-center flex flex-col items-center justify-center min-h-[500px]">
                <span className="text-6xl mb-6">📱</span>
                <p className="text-white/20 font-black uppercase tracking-widest text-xs">Architect Offline. Enter concept to initiate.</p>
              </div>
            ) : (
              <div className="space-y-8 animate-in slide-in-from-right duration-500">
                <div className="bg-[#121216] border border-white/5 p-10 rounded-[40px]">
                  <div className="flex justify-between items-start mb-10 border-b border-white/5 pb-8">
                    <div>
                      <h2 className="text-4xl font-black uppercase tracking-tighter text-[#00e0a4] mb-2">{blueprint.appName}</h2>
                      <div className="flex gap-2">
                         <span className="px-2 py-1 bg-white/5 rounded text-[8px] font-bold text-white/40 uppercase tracking-widest">v1.0.0 Alpha</span>
                         <span className="px-2 py-1 bg-[#00e0a4]/10 rounded text-[8px] font-bold text-[#00e0a4] uppercase tracking-widest">Mobile Native</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mb-10">
                    <div className="bg-[#0b0b0c] p-4 rounded-xl border border-white/5">
                      <p className="text-[8px] font-black text-white/20 uppercase tracking-widest mb-1">Frontend</p>
                      <p className="text-[10px] font-bold text-[#00e0a4]">{blueprint.stack.frontend}</p>
                    </div>
                    <div className="bg-[#0b0b0c] p-4 rounded-xl border border-white/5">
                      <p className="text-[8px] font-black text-white/20 uppercase tracking-widest mb-1">Backend</p>
                      <p className="text-[10px] font-bold text-white/60">{blueprint.stack.backend}</p>
                    </div>
                    <div className="bg-[#0b0b0c] p-4 rounded-xl border border-white/5">
                      <p className="text-[8px] font-black text-white/20 uppercase tracking-widest mb-1">Database</p>
                      <p className="text-[10px] font-bold text-white/60">{blueprint.stack.database}</p>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <section>
                      <h4 className="text-[10px] font-black uppercase text-white/30 mb-4 tracking-[0.3em]">Screen Architecture</h4>
                      <div className="grid gap-4">
                        {blueprint.screens.map((screen: any, idx: number) => (
                          <div key={idx} className="p-5 bg-[#0b0b0c] rounded-2xl border border-white/5">
                            <h5 className="text-xs font-black uppercase text-white mb-1">{screen.name}</h5>
                            <p className="text-[11px] text-white/40 font-medium leading-relaxed">{screen.description}</p>
                          </div>
                        ))}
                      </div>
                    </section>

                    <section>
                      <h4 className="text-[10px] font-black uppercase text-white/30 mb-4 tracking-[0.3em]">Compliance & Submission</h4>
                      <div className="p-6 bg-[#00e0a4]/5 border border-[#00e0a4]/10 rounded-2xl text-[11px] text-white/70 italic leading-relaxed">
                        "{blueprint.compliance}"
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-12 animate-in fade-in duration-500">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Apple Section */}
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <span className="text-4xl">🍎</span>
                <h2 className="text-3xl font-black uppercase tracking-tighter">App Store <span className="text-white/40">Connect</span></h2>
              </div>
              <div className="space-y-4">
                <StepCard store="apple" number="01" title="Developer Account" desc="Enroll in the Apple Developer Program ($99/yr). This gives you the right to publish on the App Store." />
                <StepCard store="apple" number="02" title="Certificates & IDs" desc="Create an App ID and Distribution Certificate in the Member Center to sign your application binary." />
                <StepCard store="apple" number="03" title="App Store Connect" desc="Create your app listing. Upload 6.5' and 5.5' screenshots, app description, and privacy policy URL." />
                <StepCard store="apple" number="04" title="Xcode Archive" desc="Archive your app in Xcode and upload to the store. Use TestFlight for external beta testing." />
                <StepCard store="apple" number="05" title="Review Submission" desc="Submit for review. Review times usually range from 24h to 48h. Ensure no placeholder content is present." />
              </div>
            </div>

            {/* Google Section */}
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <span className="text-4xl text-[#00e0a4]">🤖</span>
                <h2 className="text-3xl font-black uppercase tracking-tighter">Google <span className="text-[#00e0a4]/40">Play Console</span></h2>
              </div>
              <div className="space-y-4">
                <StepCard store="google" number="01" title="Play Console" desc="Register for a Google Play Developer account ($25 one-time fee). Link your billing profile." />
                <StepCard store="google" number="02" title="Create App" desc="Setup your app title, default language, and app type (App or Game). Specify if it's Free or Paid." />
                <StepCard store="google" number="03" title="Store Listing" desc="Upload high-res icon (512x512), feature graphic (1024x500), and phone/tablet screenshots." />
                <StepCard store="google" number="04" title="App Bundle (AAB)" desc="Generate a signed Android App Bundle (.aab). Upload it to the Internal or Production track." />
                <StepCard store="google" number="05" title="Rollout" desc="Set the rollout percentage. New apps usually undergo a 7-day review period for new developer accounts." />
              </div>
            </div>
          </div>

          <div className="bg-[#121216] p-10 rounded-[40px] border border-white/5 text-center">
            <h3 className="text-xl font-black uppercase mb-4 tracking-tighter">Ready to Deploy?</h3>
            <p className="text-white/40 text-sm max-w-2xl mx-auto leading-relaxed mb-8 font-medium">
              ANAI.ai Blueprints follow official HIG (Human Interface Guidelines) and Material Design 3 standards to ensure the highest chance of approval on first submission.
            </p>
            <div className="flex justify-center gap-4">
              <a href="https://developer.apple.com" target="_blank" className="bg-white text-black px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#00e0a4] transition-all">Apple Dev Portal</a>
              <a href="https://play.google.com/console" target="_blank" className="bg-white/5 border border-white/10 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">Google Play Console</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppBuilder;
