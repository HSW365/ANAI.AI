
import React, { useState } from 'react';
import { generateStoreSetup, generateWebsiteBlueprint, BrandAssets } from '../services/geminiService';
import { creditService } from '../services/creditService';
import { useNavigate } from 'react-router-dom';

const WizardStep: React.FC<{ active: boolean; number: number; title: string }> = ({ active, number, title }) => (
  <div className={`flex items-center gap-3 transition-all duration-500 ${active ? 'opacity-100' : 'opacity-30 scale-95'}`}>
    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black border ${active ? 'bg-[#00e0a4] text-black border-transparent shadow-[0_0_20px_rgba(0,224,164,0.3)]' : 'bg-transparent text-white border-white/20'}`}>
      {number}
    </span>
    <span className="text-[10px] font-black uppercase tracking-widest hidden md:block">{title}</span>
  </div>
);

const Ecommerce: React.FC = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'store' | 'web'>('store');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  // Wizard State
  const [wizardStep, setWizardStep] = useState(0);

  // Store Builder State
  const [pName, setPName] = useState('');
  const [pType, setPType] = useState('ebook');
  const [pNiche, setPNiche] = useState('');
  const [pTargetAudience, setPTargetAudience] = useState('');

  // Web Builder State
  const [brand, setBrand] = useState('');
  const [webNiche, setWebNiche] = useState('');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  
  // Specific Brand Assets
  const [logoDesc, setLogoDesc] = useState('');
  const [primaryColor, setPrimaryColor] = useState('#00e0a4');
  const [secondaryColor, setSecondaryColor] = useState('#ffffff');
  const [typography, setTypography] = useState('Inter, sans-serif');

  const fileToBase64 = (file: File): Promise<{ data: string, mimeType: string }> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = (reader.result as string).split(',')[1];
        resolve({ data: base64, mimeType: file.type });
      };
      reader.onerror = error => reject(error);
    });
  };

  const handleGenerateStore = async () => {
    if (!pName || !pNiche) return;

    if (creditService.getCredits() <= 0) {
      alert("Neural Bank Depleted. Please Top Up.");
      navigate('/pricing');
      return;
    }

    setLoading(true);
    try {
      const data = await generateStoreSetup(pName, pType, pNiche);
      creditService.consumeCredit();
      setResult(data);
      setWizardStep(3); // Result step
    } catch (e) {
      alert("Neural engine timing out. Please retry.");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateWeb = async () => {
    if (!brand || !webNiche) return;

    if (creditService.getCredits() <= 0) {
      alert("Neural Bank Depleted. Please Top Up.");
      navigate('/pricing');
      return;
    }

    setLoading(true);
    try {
      let logoData;
      if (logoFile) {
        logoData = await fileToBase64(logoFile);
      }

      const assets: BrandAssets = {
        primaryColor,
        secondaryColor,
        typography
      };
      const data = await generateWebsiteBlueprint(brand, webNiche, assets, logoData);
      creditService.consumeCredit();
      setResult(data);
    } catch (e) {
      alert("Web architect busy.");
    } finally {
      setLoading(false);
    }
  };

  const copyTokens = () => {
    if (result?.visuals?.designTokens) {
      navigator.clipboard.writeText(result.visuals.designTokens);
      alert("Neural Design Tokens Copied to Clipboard.");
    }
  };

  const clearResult = () => {
    setResult(null);
    setWizardStep(0);
    setLogoFile(null);
  };

  const nextStep = () => setWizardStep(prev => Math.min(prev + 1, 2));
  const prevStep = () => setWizardStep(prev => Math.max(prev - 1, 0));

  return (
    <div className="px-6 py-12 max-w-7xl mx-auto min-h-screen">
      <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-5xl font-black uppercase tracking-tighter mb-4">EMPIRE <span className="text-[#00e0a4]">COMMERCE</span></h1>
          <p className="text-white/50 font-medium uppercase tracking-[0.2em] text-xs">Architect high-conversion digital assets</p>
        </div>
        <div className="flex bg-[#121216] p-1 rounded-xl border border-white/5">
          <button 
            onClick={() => { setTab('store'); clearResult(); }}
            className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${tab === 'store' ? 'bg-[#00e0a4] text-black shadow-lg shadow-[#00e0a4]/10' : 'text-white/40 hover:text-white'}`}
          >
            Launch Wizard
          </button>
          <button 
            onClick={() => { setTab('web'); clearResult(); }}
            className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${tab === 'web' ? 'bg-[#00e0a4] text-black shadow-lg shadow-[#00e0a4]/10' : 'text-white/40 hover:text-white'}`}
          >
            Domain Blueprint
          </button>
        </div>
      </div>

      {tab === 'store' ? (
        <div className="space-y-12">
          {/* Wizard Progress Bar */}
          {wizardStep < 3 && (
            <div className="max-w-3xl mx-auto flex justify-between items-center bg-[#121216] p-6 rounded-[32px] border border-white/5 mb-12">
              <WizardStep active={wizardStep === 0} number={1} title="The Concept" />
              <div className="flex-grow h-[1px] bg-white/5 mx-4" />
              <WizardStep active={wizardStep === 1} number={2} title="Visual DNA" />
              <div className="flex-grow h-[1px] bg-white/5 mx-4" />
              <WizardStep active={wizardStep === 2} number={3} title="Market Edge" />
            </div>
          )}

          <div className="max-w-4xl mx-auto">
            {wizardStep === 0 && (
              <div className="bg-[#121216] border border-white/5 p-10 md:p-16 rounded-[48px] animate-in fade-in slide-in-from-bottom duration-500 shadow-2xl space-y-10">
                <div className="text-center space-y-4">
                  <h2 className="text-3xl font-black uppercase tracking-tighter">Define Your Asset</h2>
                  <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">Phase 1: Foundation</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-[10px] font-black uppercase text-white/40 mb-3 tracking-widest">Digital Product Name</label>
                      <input 
                        value={pName} onChange={e => setPName(e.target.value)}
                        className="w-full bg-[#0b0b0c] border border-white/5 p-5 rounded-2xl focus:border-[#00e0a4] outline-none text-sm font-bold text-white shadow-inner"
                        placeholder="e.g. Creator Revenue OS"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase text-white/40 mb-3 tracking-widest">Asset Category</label>
                      <select 
                        value={pType} onChange={e => setPType(e.target.value)}
                        className="w-full bg-[#0b0b0c] border border-white/5 p-5 rounded-2xl focus:border-[#00e0a4] outline-none text-sm font-bold text-white appearance-none"
                      >
                        <option value="ebook">Premium eBook / Guide</option>
                        <option value="course">Video Masterclass</option>
                        <option value="template">Workflow Template</option>
                        <option value="software">SaaS Micro-Tool</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-[10px] font-black uppercase text-white/40 mb-3 tracking-widest">Target Niche</label>
                      <textarea 
                        value={pNiche} onChange={e => setPNiche(e.target.value)}
                        className="w-full bg-[#0b0b0c] border border-white/5 p-5 rounded-2xl focus:border-[#00e0a4] outline-none text-sm font-medium min-h-[160px] leading-relaxed"
                        placeholder="Describe who this is for... e.g. Freelance designers moving into high-ticket consulting."
                      />
                    </div>
                  </div>
                </div>
                <div className="pt-6">
                  <button onClick={nextStep} disabled={!pName || !pNiche} className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-[#00e0a4] transition-all disabled:opacity-30 shadow-xl">
                    CONTINUE TO BRANDING →
                  </button>
                </div>
              </div>
            )}

            {wizardStep === 1 && (
              <div className="bg-[#121216] border border-white/5 p-10 md:p-16 rounded-[48px] animate-in fade-in slide-in-from-right duration-500 shadow-2xl space-y-10">
                <div className="text-center space-y-4">
                  <h2 className="text-3xl font-black uppercase tracking-tighter">Visual Identity DNA</h2>
                  <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">Phase 2: Aesthetics</p>
                </div>
                
                <div className="space-y-8">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-white/40 mb-3 tracking-widest">Logo Description / Art Direction</label>
                    <input 
                      value={logoDesc} onChange={e => setLogoDesc(e.target.value)}
                      className="w-full bg-[#0b0b0c] border border-white/5 p-5 rounded-2xl focus:border-[#00e0a4] outline-none text-sm font-bold"
                      placeholder="e.g. Minimalist geometric hawk, monochrome, high-contrast."
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-[10px] font-black uppercase text-white/40 mb-3 tracking-widest">Primary Brand Color</label>
                        <div className="flex gap-4 p-4 bg-[#0b0b0c] border border-white/5 rounded-2xl items-center">
                          <input type="color" value={primaryColor} onChange={e => setPrimaryColor(e.target.value)} className="w-12 h-12 bg-transparent border-0 cursor-pointer rounded-xl overflow-hidden" />
                          <input value={primaryColor} onChange={e => setPrimaryColor(e.target.value)} className="bg-transparent border-0 text-white font-black text-sm uppercase outline-none" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase text-white/40 mb-3 tracking-widest">Secondary Color</label>
                        <div className="flex gap-4 p-4 bg-[#0b0b0c] border border-white/5 rounded-2xl items-center">
                          <input type="color" value={secondaryColor} onChange={e => setSecondaryColor(e.target.value)} className="w-12 h-12 bg-transparent border-0 cursor-pointer rounded-xl overflow-hidden" />
                          <input value={secondaryColor} onChange={e => setSecondaryColor(e.target.value)} className="bg-transparent border-0 text-white font-black text-sm uppercase outline-none" />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-[10px] font-black uppercase text-white/40 mb-3 tracking-widest">Typography Palette</label>
                        <input 
                          value={typography} onChange={e => setTypography(e.target.value)}
                          className="w-full bg-[#0b0b0c] border border-white/5 p-5 rounded-2xl focus:border-[#00e0a4] outline-none text-sm font-black"
                          placeholder="e.g. Helvetica Now, Bold Display"
                        />
                      </div>
                      <div className="p-8 bg-white/5 border border-white/10 rounded-[32px] text-center italic text-[10px] text-white/20 uppercase font-black">
                        "Design is the silent ambassador of your brand."
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <button onClick={prevStep} className="flex-1 bg-white/5 border border-white/10 text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                    BACK
                  </button>
                  <button onClick={nextStep} className="flex-[2] bg-white text-black py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-[#00e0a4] transition-all shadow-xl">
                    CONTINUE TO STRATEGY →
                  </button>
                </div>
              </div>
            )}

            {wizardStep === 2 && (
              <div className="bg-[#121216] border border-white/5 p-10 md:p-16 rounded-[48px] animate-in fade-in slide-in-from-right duration-500 shadow-2xl space-y-10">
                <div className="text-center space-y-4">
                  <h2 className="text-3xl font-black uppercase tracking-tighter">Market Penetration</h2>
                  <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">Phase 3: Strategy</p>
                </div>
                
                <div className="space-y-8">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-white/40 mb-3 tracking-widest">Ideal Customer Avatar</label>
                    <textarea 
                      value={pTargetAudience} onChange={e => setPTargetAudience(e.target.value)}
                      className="w-full bg-[#0b0b0c] border border-white/5 p-6 rounded-2xl focus:border-[#00e0a4] outline-none text-sm font-medium min-h-[140px]"
                      placeholder="e.g. 25-35 year old solo-entrepreneurs looking to scale beyond $10k/month..."
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    {[
                      { label: 'Low Ticket', range: '$7 - $47' },
                      { label: 'Mid Ticket', range: '$97 - $497' },
                      { label: 'High Ticket', range: '$997+' }
                    ].map(tier => (
                      <div key={tier.label} className="p-6 bg-[#0b0b0c] border border-white/5 rounded-2xl text-center group hover:border-[#00e0a4] transition-all cursor-pointer">
                        <p className="text-[9px] font-black uppercase text-white/20 mb-2">{tier.label}</p>
                        <p className="text-lg font-black text-white group-hover:text-[#00e0a4]">{tier.range}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <button onClick={prevStep} className="flex-1 bg-white/5 border border-white/10 text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                    BACK
                  </button>
                  <button onClick={handleGenerateStore} disabled={loading} className="flex-[2] bg-[#00e0a4] text-black py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white transition-all shadow-xl shadow-[#00e0a4]/10">
                    {loading ? 'CALCULATING EMPIRE...' : 'GENERATE ASSET BLUEPRINT (1 CREDIT)'}
                  </button>
                </div>
              </div>
            )}

            {wizardStep === 3 && result && (
              <div className="animate-in zoom-in fade-in duration-700 space-y-12">
                <div className="bg-[#121216] border border-white/5 p-12 rounded-[60px] relative overflow-hidden shadow-2xl">
                  <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-[#00e0a4]/5 via-transparent to-transparent pointer-events-none" />
                  
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 border-b border-white/5 pb-12">
                    <div>
                      <h2 className="text-xs font-black uppercase text-[#00e0a4] tracking-[0.4em] mb-4">Neural Launch Blueprint v1.0</h2>
                      <h1 className="text-5xl font-black uppercase tracking-tighter text-white">{pName}</h1>
                      <div className="flex gap-4 mt-4">
                        <div className="px-3 py-1 bg-white/5 rounded-full border border-white/10 text-[9px] font-black uppercase text-white/40">{pType}</div>
                        <div className="px-3 py-1 bg-[#00e0a4]/10 rounded-full border border-[#00e0a4]/20 text-[9px] font-black uppercase text-[#00e0a4]">Validated</div>
                      </div>
                    </div>
                    <button onClick={clearResult} className="text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-white transition-all">Start New Build</button>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-16">
                    <section className="space-y-10">
                      <div>
                        <h4 className="text-[10px] font-black uppercase text-white/30 mb-6 tracking-[0.3em]">Sales Engine Headline</h4>
                        <div className="p-8 bg-[#0b0b0c] border border-white/5 rounded-[32px] space-y-4">
                           <h3 className="text-3xl font-black uppercase tracking-tighter text-[#00e0a4]">{result.salesCopy.headline}</h3>
                           <p className="text-white/60 font-medium italic leading-relaxed">"{result.salesCopy.subheadline}"</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-[10px] font-black uppercase text-white/30 mb-6 tracking-[0.3em]">Core Benefits & Transformation</h4>
                        <div className="grid gap-4">
                          {result.salesCopy.benefits.map((b: string, i: number) => (
                            <div key={i} className="flex gap-4 p-5 bg-white/5 border border-white/5 rounded-2xl items-center">
                              <span className="text-[#00e0a4] text-xl">✔</span>
                              <span className="text-xs font-bold text-white/80 uppercase tracking-tight">{b}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>

                    <section className="space-y-10">
                      <div>
                        <h4 className="text-[10px] font-black uppercase text-white/30 mb-6 tracking-[0.3em]">Tiered Pricing Model</h4>
                        <div className="grid gap-6">
                          {result.pricing.map((p: any, i: number) => (
                            <div key={i} className="p-8 bg-[#0b0b0c] border border-white/5 rounded-[32px] relative overflow-hidden group hover:border-[#00e0a4]/40 transition-all">
                              <div className="flex justify-between items-start mb-6">
                                <div>
                                  <p className="text-[9px] font-black uppercase text-[#00e0a4] mb-1">{p.tier}</p>
                                  <p className="text-4xl font-black text-white">{p.price}</p>
                                </div>
                                <span className="text-white/10 text-4xl group-hover:scale-110 transition-transform">💎</span>
                              </div>
                              <ul className="space-y-3">
                                {p.features.map((f: string, j: number) => (
                                  <li key={j} className="text-[10px] font-bold text-white/40 uppercase tracking-tight flex gap-2">
                                    <span className="text-white/20">•</span> {f}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-8 bg-[#00e0a4]/5 border border-[#00e0a4]/10 rounded-[40px] flex items-center justify-between gap-8">
                         <div>
                            <h5 className="text-[10px] font-black uppercase text-white/40 tracking-widest mb-2">Empire Strategy: Upsell Engine</h5>
                            <p className="text-sm font-black text-[#00e0a4] italic leading-relaxed">"{result.upsellIdea}"</p>
                         </div>
                         <div className="text-5xl opacity-20">🚀</div>
                      </div>
                    </section>
                  </div>
                  
                  <div className="mt-16 pt-12 border-t border-white/5 text-center">
                    <p className="text-[10px] font-black uppercase text-white/20 tracking-[0.4em] mb-8">Official Network Distribution</p>
                    <div className="flex flex-wrap justify-center gap-6">
                       <a href="https://hsw365media.com" target="_blank" className="bg-white text-black px-12 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-[#00e0a4] transition-all shadow-xl">List on HSW365 Media Hub ↗</a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Domain Blueprint Layout */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#121216] border border-white/5 p-10 rounded-[40px] space-y-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#00e0a4]/5 blur-[60px] rounded-full pointer-events-none" />
              
              <h3 className="text-xl font-black uppercase tracking-tighter relative z-10">Web Command Center</h3>
              
              <div className="space-y-6 relative z-10">
                <section className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-white/40 mb-3 tracking-widest">Brand Name</label>
                    <input 
                      value={brand} onChange={e => setBrand(e.target.value)}
                      className="w-full bg-[#0b0b0c] border border-white/5 p-4 rounded-xl focus:border-[#00e0a4] outline-none text-sm font-bold"
                      placeholder="e.g. FlowState Media"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-white/40 mb-3 tracking-widest">Business Niche</label>
                    <textarea 
                      value={webNiche} onChange={e => setWebNiche(e.target.value)}
                      className="w-full bg-[#0b0b0c] border border-white/5 p-4 rounded-xl focus:border-[#00e0a4] outline-none text-sm font-medium min-h-[100px]"
                      placeholder="e.g. A high-end agency providing AI automation for creators..."
                    />
                  </div>
                </section>

                <section className="pt-6 border-t border-white/5 space-y-6">
                  <h4 className="text-[10px] font-black uppercase text-[#00e0a4] tracking-widest">Brand DNA (Neural Input)</h4>
                  
                  <div>
                    <label className="block text-[10px] font-black uppercase text-white/40 mb-3 tracking-widest">Logo Upload (SVG/PNG)</label>
                    <div className="relative border border-dashed border-white/10 rounded-xl p-6 text-center hover:border-[#00e0a4] transition-all cursor-pointer group">
                      <input 
                        type="file" 
                        accept="image/png,image/svg+xml" 
                        onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                      <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">🖼️</div>
                      <p className="text-[9px] font-black text-white/30 uppercase tracking-widest">
                        {logoFile ? logoFile.name : 'Drop Logo to Sync Aesthetic'}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black uppercase text-white/40 mb-3 tracking-widest">Primary Color</label>
                      <div className="flex gap-3 p-3 bg-[#0b0b0c] border border-white/5 rounded-xl items-center">
                        <input type="color" value={primaryColor} onChange={e => setPrimaryColor(e.target.value)} className="w-8 h-8 bg-transparent border-0 cursor-pointer rounded-lg overflow-hidden" />
                        <span className="text-[10px] font-black text-white/60 uppercase">{primaryColor}</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase text-white/40 mb-3 tracking-widest">Secondary Color</label>
                      <div className="flex gap-3 p-3 bg-[#0b0b0c] border border-white/5 rounded-xl items-center">
                        <input type="color" value={secondaryColor} onChange={e => setSecondaryColor(e.target.value)} className="w-8 h-8 bg-transparent border-0 cursor-pointer rounded-lg overflow-hidden" />
                        <span className="text-[10px] font-black text-white/60 uppercase">{secondaryColor}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase text-white/40 mb-3 tracking-widest">Typography Preference</label>
                    <input 
                      value={typography} onChange={e => setTypography(e.target.value)}
                      className="w-full bg-[#0b0b0c] border border-white/5 p-4 rounded-xl focus:border-[#00e0a4] outline-none text-sm font-bold"
                      placeholder="e.g. Inter, Gilroy, SF Pro"
                    />
                  </div>
                </section>

                <button 
                  onClick={handleGenerateWeb} disabled={loading || !brand}
                  className="w-full bg-[#00e0a4] text-black py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white transition-all disabled:opacity-50 shadow-xl"
                >
                  {loading ? 'ARCHITECTING SITE...' : 'GENERATE WEB BLUEPRINT (1 CREDIT)'}
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            {!result ? (
              <div className="bg-[#121216]/40 p-12 rounded-[40px] border border-dashed border-white/5 text-center flex flex-col items-center justify-center min-h-[500px]">
                <span className="text-6xl mb-6">🌐</span>
                <p className="text-white/20 font-black uppercase tracking-widest text-xs">Awaiting Domain Sequence Protocol.</p>
              </div>
            ) : (
              <div className="space-y-8 animate-in slide-in-from-right duration-500">
                <div className="bg-[#121216] border border-white/5 p-10 rounded-[40px] shadow-2xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-[#00e0a4]/5 via-transparent to-transparent pointer-events-none" />
                  
                  <div className="mb-10 border-b border-white/5 pb-8 relative z-10 flex justify-between items-start">
                     <div>
                       <h2 className="text-3xl font-black uppercase tracking-tighter text-white mb-2">{brand} <span className="text-[#00e0a4]">Web Blueprint</span></h2>
                       <p className="text-xs font-black uppercase tracking-[0.3em] text-white/30">Neural Design Sequence Alpha</p>
                     </div>
                     <button onClick={copyTokens} className="px-4 py-2 bg-[#00e0a4]/10 border border-[#00e0a4]/20 rounded-xl text-[9px] font-black text-[#00e0a4] uppercase tracking-widest hover:bg-[#00e0a4] hover:text-black transition-all">
                       Copy Design System
                     </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-12 relative z-10">
                     <section>
                        <h4 className="text-[10px] font-black uppercase text-[#00e0a4] mb-6 tracking-[0.3em]">Suggested Domains</h4>
                        <div className="space-y-3">
                          {result.domains.map((d: string, i: number) => (
                            <div key={i} className="flex justify-between items-center p-4 bg-[#0b0b0c] border border-white/5 rounded-xl group hover:border-[#00e0a4]/40 transition-all cursor-pointer">
                              <span className="text-sm font-black text-white group-hover:text-[#00e0a4]">{d}</span>
                              <span className="text-[9px] font-bold text-[#00e0a4] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Register</span>
                            </div>
                          ))}
                        </div>
                     </section>

                     <section>
                        <h4 className="text-[10px] font-black uppercase text-[#00e0a4] mb-6 tracking-[0.3em]">Neural Visual Identity</h4>
                        <div className="p-6 bg-[#0b0b0c] border border-white/5 rounded-2xl space-y-6">
                          <div>
                            <p className="text-[9px] font-black uppercase text-white/20 mb-3 tracking-widest">Brand Palette</p>
                            <div className="flex gap-2">
                              {result.visuals.palette.map((c: string, i: number) => (
                                <div key={i} className="w-10 h-10 rounded-full border border-white/10 shadow-sm" style={{ backgroundColor: c.startsWith('#') ? c : '#333' }} title={c} />
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-[9px] font-black uppercase text-white/20 mb-2 tracking-widest">Typography Strategy</p>
                            <p className="text-xs font-bold text-white/80">{result.visuals.typography}</p>
                          </div>
                        </div>
                     </section>
                  </div>

                  <div className="mt-12 relative z-10">
                    <h4 className="text-[10px] font-black uppercase text-[#00e0a4] mb-6 tracking-[0.3em]">Design Tokens (CSS-Sync)</h4>
                    <div className="p-5 bg-[#0b0b0c] border border-white/5 rounded-2xl mb-8">
                       <pre className="text-[10px] font-medium text-white/40 leading-relaxed overflow-x-auto whitespace-pre-wrap">
                         {result.visuals.designTokens}
                       </pre>
                    </div>

                    <h4 className="text-[10px] font-black uppercase text-[#00e0a4] mb-6 tracking-[0.3em]">Site Architecture & Sitemap</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      {result.sitemap.map((s: any, i: number) => (
                        <div key={i} className="p-5 bg-[#0b0b0c] border border-white/5 rounded-2xl group hover:border-[#00e0a4]/20 transition-all">
                          <h5 className="text-xs font-black uppercase text-white mb-1">/{s.page.toLowerCase()}</h5>
                          <p className="text-[10px] text-white/40 font-medium uppercase tracking-tight leading-relaxed">{s.goal}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Ecommerce;
