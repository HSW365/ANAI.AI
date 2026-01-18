
import React, { useState } from 'react';
import { generateMarketingKit } from '../services/geminiService';
import { creditService } from '../services/creditService';
import { useNavigate } from 'react-router-dom';

const Automate: React.FC = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState('');
  const [audience, setAudience] = useState('');
  const [loading, setLoading] = useState(false);
  const [kit, setKit] = useState<any>(null);

  const handleAutomate = async () => {
    if (!product || !audience) return;

    if (creditService.getCredits() <= 0) {
      alert("Neural Bank Depleted. Please Top Up.");
      navigate('/pricing');
      return;
    }

    setLoading(true);
    try {
      const data = await generateMarketingKit(product, audience);
      creditService.consumeCredit();
      setKit(data);
    } catch (e) {
      alert("Automation Fault. Retry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-6 py-12 max-w-5xl mx-auto">
      <div className="mb-12">
        <h1 className="text-5xl font-black uppercase tracking-tighter mb-4">SYSTEM <span className="text-[#00e0a4]">AUTOMATION</span></h1>
        <p className="text-white/50 font-medium uppercase tracking-[0.2em] text-xs">Run Your Empire on Autopilot</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-[#121216] border border-white/5 p-10 rounded-[40px] space-y-8">
            <h3 className="text-2xl font-black uppercase tracking-tighter">Command Input</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black uppercase text-white/40 mb-3 tracking-widest">Target Product/Brand</label>
                <input 
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  className="w-full bg-[#0b0b0c] border border-white/5 p-4 rounded-xl focus:border-[#00e0a4] outline-none text-sm font-medium"
                  placeholder="e.g. Zen Wealth eBook"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase text-white/40 mb-3 tracking-widest">Target Audience</label>
                <input 
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  className="w-full bg-[#0b0b0c] border border-white/5 p-4 rounded-xl focus:border-[#00e0a4] outline-none text-sm font-medium"
                  placeholder="e.g. Burnt out tech professionals"
                />
              </div>
              <button 
                onClick={handleAutomate}
                disabled={loading || !product || !audience}
                className="w-full bg-[#00e0a4] text-[#041b14] py-5 rounded-2xl font-black uppercase tracking-tighter hover:bg-white transition-all disabled:opacity-50"
              >
                {loading ? 'DEPLOYING AGENTS...' : 'GENERATE MARKETING KIT (1 CREDIT)'}
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          {!kit ? (
             <div className="bg-[#121216]/40 p-12 rounded-[40px] border border-dashed border-white/5 text-center flex flex-col items-center justify-center min-h-[400px]">
                <span className="text-5xl mb-6">⚙️</span>
                <p className="text-white/20 font-black uppercase tracking-widest text-xs">System Idle. Pending Operator Input.</p>
             </div>
          ) : (
            <div className="space-y-8 animate-in zoom-in duration-300">
              <div className="bg-[#121216] border border-white/5 p-10 rounded-[40px]">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#00e0a4] mb-8">Generated Assets</h3>
                
                <div className="space-y-10">
                  <section>
                    <h4 className="text-[10px] font-black uppercase text-white/30 mb-4 tracking-widest">High-Conversion Headlines</h4>
                    <div className="space-y-2">
                      {kit.headlines.map((h: string, i: number) => (
                        <div key={i} className="p-4 bg-[#0b0b0c] rounded-xl border border-white/5 text-sm font-bold text-white/80">{h}</div>
                      ))}
                    </div>
                  </section>

                  <section>
                    <h4 className="text-[10px] font-black uppercase text-white/30 mb-4 tracking-widest">Email Hook</h4>
                    <div className="p-6 bg-[#0b0b0c] rounded-xl border-l-4 border-[#00e0a4] italic text-sm text-white/70">
                      "{kit.emailHook}"
                    </div>
                  </section>

                  <section>
                    <h4 className="text-[10px] font-black uppercase text-white/30 mb-4 tracking-widest">Social Captions</h4>
                    <div className="grid gap-4">
                      {kit.socialCaptions.map((c: string, i: number) => (
                        <div key={i} className="p-5 bg-[#0b0b0c] rounded-xl border border-white/5 text-xs text-white/50 leading-relaxed whitespace-pre-wrap">{c}</div>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Automate;
