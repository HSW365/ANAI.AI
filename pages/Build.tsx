
import React, { useState } from 'react';
import { generateDigitalProduct } from '../services/geminiService';
import { creditService } from '../services/creditService';
import { useNavigate } from 'react-router-dom';

const Build: React.FC = () => {
  const navigate = useNavigate();
  const [idea, setIdea] = useState('');
  const [type, setType] = useState<'ebook' | 'course' | 'business_plan'>('ebook');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleBuild = async () => {
    if (!idea) return;

    if (creditService.getCredits() <= 0) {
      alert("Neural Bank Depleted. Please Top Up.");
      navigate('/pricing');
      return;
    }

    setLoading(true);
    try {
      const data = await generateDigitalProduct(idea, type);
      creditService.consumeCredit();
      setResult(data);
    } catch (e) {
      alert("System Busy. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-6 py-12 max-w-5xl mx-auto">
      <div className="mb-12">
        <h1 className="text-5xl font-black uppercase tracking-tighter mb-4">PRODUCT <span className="text-[#00e0a4]">BUILDER</span></h1>
        <p className="text-white/50 font-medium uppercase tracking-[0.2em] text-xs">Turn Your Thought Into a Deliverable Asset</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#121216] border border-white/5 p-8 rounded-[32px] space-y-6">
            <div>
              <label className="block text-[10px] font-black uppercase text-white/40 mb-4 tracking-widest">Select Asset Type</label>
              <div className="grid grid-cols-1 gap-2">
                {(['ebook', 'course', 'business_plan'] as const).map(t => (
                  <button 
                    key={t}
                    onClick={() => setType(t)}
                    className={`px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-left transition-all ${
                      type === t ? 'bg-[#00e0a4] text-[#041b14]' : 'bg-[#0b0b0c] text-white/40 border border-white/5'
                    }`}
                  >
                    {t.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase text-white/40 mb-4 tracking-widest">Your Idea / Niche</label>
              <textarea 
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                className="w-full bg-[#0b0b0c] border border-white/5 p-4 rounded-xl focus:border-[#00e0a4] outline-none min-h-[150px] text-sm font-medium"
                placeholder="e.g. A guide for indie artists to master digital marketing in 2025..."
              />
            </div>
            <button 
              onClick={handleBuild}
              disabled={loading || !idea}
              className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase tracking-tighter hover:bg-[#00e0a4] transition-all disabled:opacity-50"
            >
              {loading ? 'PROCESSING NEURAL ENGINE...' : 'GENERATE ASSET (1 CREDIT)'}
            </button>
          </div>
        </div>

        <div className="lg:col-span-2">
          {!result ? (
            <div className="h-full min-h-[400px] border border-dashed border-white/10 rounded-[32px] flex flex-col items-center justify-center text-center p-12">
              <span className="text-6xl mb-6 opacity-20">🧊</span>
              <h3 className="text-xl font-black uppercase tracking-tighter text-white/20">Awaiting Neural Sequence</h3>
              <p className="text-white/10 text-sm mt-2 uppercase font-bold tracking-widest">Fill out the build command to generate your asset</p>
            </div>
          ) : (
            <div className="space-y-8 animate-in slide-in-from-right duration-500">
              <div className="bg-[#121216] border border-white/5 p-10 rounded-[40px]">
                <div className="flex justify-between items-start mb-10">
                   <div>
                    <h2 className="text-3xl font-black uppercase tracking-tighter text-[#00e0a4] mb-2">{result.title}</h2>
                    <p className="text-xs font-black uppercase tracking-[0.3em] text-white/30">Master Blueprint v1.0</p>
                  </div>
                  <button className="bg-white/5 p-3 rounded-xl hover:bg-white/10 text-white/60">💾</button>
                </div>
                
                <div className="space-y-6">
                  {result.outline.map((item: any, idx: number) => (
                    <div key={idx} className="bg-[#0b0b0c] p-6 rounded-2xl border border-white/5 group hover:border-[#00e0a4]/20 transition-all">
                      <h4 className="text-xs font-black uppercase text-[#00e0a4] mb-2 tracking-widest">Section {idx + 1}: {item.chapter}</h4>
                      <p className="text-white/50 text-sm leading-relaxed">{item.summary}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-12 p-8 bg-[#00e0a4]/5 rounded-3xl border border-[#00e0a4]/10">
                  <h4 className="text-sm font-black uppercase text-[#00e0a4] mb-3 tracking-widest">Monetization Strategy</h4>
                  <p className="text-white/70 text-sm italic">"{result.strategy}"</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Build;
