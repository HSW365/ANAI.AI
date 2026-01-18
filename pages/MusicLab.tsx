
import React, { useState, useRef } from 'react';
import { generateMusicBlueprint, generatePromoArt, generateVoicePreview } from '../services/geminiService';
import { creditService } from '../services/creditService';
import { useNavigate } from 'react-router-dom';

const VisualizerBar: React.FC<{ delay: string }> = ({ delay }) => (
  <div 
    className="w-1 bg-[#00e0a4] rounded-full animate-bounce h-8" 
    style={{ animationDuration: '0.8s', animationDelay: delay }} 
  />
);

const MusicLab: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [generatingArt, setGeneratingArt] = useState(false);
  const [generatingVoice, setGeneratingVoice] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [coverArt, setCoverArt] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  
  // Input State
  const [songConcept, setSongConcept] = useState('');
  const [artistStyle, setArtistStyle] = useState('Modern Rap/Melodic');
  const [customReference, setCustomReference] = useState('');
  const [language, setLanguage] = useState('English');
  const [songLength, setSongLength] = useState('60s');
  const [numVariations, setNumVariations] = useState(1);

  const handleForgeMusic = async () => {
    if (!songConcept) return;

    if (creditService.getCredits() <= 0) {
      alert("Neural Bank Depleted. Please Top Up.");
      navigate('/pricing');
      return;
    }

    setLoading(true);
    setCoverArt(null);
    setAudioUrl(null);
    try {
      const data = await generateMusicBlueprint(songConcept, artistStyle, customReference, language, songLength, numVariations);
      creditService.consumeCredit();
      setResult(data);
    } catch (e) {
      alert("Neural audio engine processing error. Please retry.");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateArt = async () => {
    if (!result) return;

    if (creditService.getCredits() <= 0) {
      alert("Neural Bank Depleted. Please Top Up.");
      navigate('/pricing');
      return;
    }

    setGeneratingArt(true);
    try {
      const prompt = `Album cover for AI artist ${result.artist.name}. Style: ${customReference || artistStyle}. Theme: ${result.production.beatVariations?.[0] || artistStyle}. High-end streetwear aesthetic, minimal, cinematic.`;
      const url = await generatePromoArt(prompt);
      if (url) {
        creditService.consumeCredit();
        setCoverArt(url);
      }
    } catch (e) {
      alert("Visual forge busy.");
    } finally {
      setGeneratingArt(false);
    }
  };

  const handleVoicePreview = async () => {
    if (!result) return;

    if (creditService.getCredits() <= 0) {
      alert("Neural Bank Depleted. Please Top Up.");
      navigate('/pricing');
      return;
    }

    setGeneratingVoice(true);
    try {
      const voiceData = await generateVoicePreview(result.lyrics.hook, 'Zephyr');
      if (voiceData) {
        creditService.consumeCredit();
        setAudioUrl('generated');
        alert("Neural Voice Signature Generated. System optimized for artist timbre.");
      }
    } catch (e) {
      alert("Voice forge busy.");
    } finally {
      setGeneratingVoice(false);
    }
  };

  const clearResult = () => {
    setResult(null);
    setCoverArt(null);
    setAudioUrl(null);
    setSongConcept('');
    setCustomReference('');
  };

  return (
    <div className="px-6 py-12 max-w-7xl mx-auto min-h-screen">
      <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-5xl font-black uppercase tracking-tighter mb-4">NEURAL <span className="text-[#00e0a4]">AUDIO STUDIO</span></h1>
          <p className="text-white/50 font-medium uppercase tracking-[0.2em] text-xs">Architect AI Artists & Copyright-Free Anthems</p>
        </div>
        {result && (
          <div className="flex gap-2">
            <div className="px-4 py-2 bg-[#00e0a4]/10 border border-[#00e0a4]/20 rounded-xl text-[9px] font-black text-[#00e0a4] uppercase tracking-widest">
              Legal: Copyright-Free
            </div>
            <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black text-white/40 uppercase tracking-widest">
              Engine: Pro v2.5
            </div>
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
        {/* Control Panel */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#121216] border border-white/5 p-8 rounded-[40px] space-y-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00e0a4]/5 blur-[60px] rounded-full pointer-events-none" />
            <h2 className="text-xl font-black uppercase tracking-tighter relative z-10">Studio Config</h2>
            
            <div className="space-y-6 relative z-10">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase text-white/40 mb-3 tracking-widest">General Genre</label>
                  <select 
                    value={artistStyle} onChange={e => setArtistStyle(e.target.value)}
                    className="w-full bg-[#0b0b0c] border border-white/5 p-4 rounded-xl focus:border-[#00e0a4] outline-none text-sm font-bold text-white appearance-none"
                  >
                    <option>Modern Rap / Melodic</option>
                    <option>High-Energy Drill</option>
                    <option>R&B / Soul Fusion</option>
                    <option>Electronic / Cyberpop</option>
                    <option>Latin Trap</option>
                    <option>Lo-Fi / Chillhop</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-white/40 mb-3 tracking-widest">Language</label>
                  <input 
                    value={language} onChange={e => setLanguage(e.target.value)}
                    className="w-full bg-[#0b0b0c] border border-white/5 p-4 rounded-xl focus:border-[#00e0a4] outline-none text-sm font-bold"
                    placeholder="e.g. English"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase text-white/40 mb-3 tracking-widest">Song Duration</label>
                  <select 
                    value={songLength} onChange={e => setSongLength(e.target.value)}
                    className="w-full bg-[#0b0b0c] border border-white/5 p-4 rounded-xl focus:border-[#00e0a4] outline-none text-sm font-bold text-white appearance-none"
                  >
                    <option value="30s">30 Seconds</option>
                    <option value="60s">60 Seconds</option>
                    <option value="120s">120 Seconds</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-white/40 mb-3 tracking-widest">Beat Variations</label>
                  <select 
                    value={numVariations} onChange={e => setNumVariations(Number(e.target.value))}
                    className="w-full bg-[#0b0b0c] border border-white/5 p-4 rounded-xl focus:border-[#00e0a4] outline-none text-sm font-bold text-white appearance-none"
                  >
                    <option value={1}>1 Take</option>
                    <option value={2}>2 Takes</option>
                    <option value={3}>3 Takes</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-white/40 mb-3 tracking-widest">Artist/Era Reference (Optional)</label>
                <input 
                  value={customReference} onChange={e => setCustomReference(e.target.value)}
                  className="w-full bg-[#0b0b0c] border border-white/5 p-4 rounded-xl focus:border-[#00e0a4] outline-none text-sm font-bold"
                  placeholder="e.g. Kanye West, 80s Synth-pop..."
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-white/40 mb-3 tracking-widest">Song Concept / Narrative</label>
                <textarea 
                  value={songConcept} onChange={e => setSongConcept(e.target.value)}
                  className="w-full bg-[#0b0b0c] border border-white/5 p-4 rounded-xl focus:border-[#00e0a4] outline-none text-sm font-medium min-h-[140px] leading-relaxed"
                  placeholder="e.g. A song about escaping the matrix and building a digital empire..."
                />
              </div>

              <button 
                onClick={handleForgeMusic} disabled={loading || !songConcept}
                className="w-full bg-[#00e0a4] text-black py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white transition-all shadow-xl shadow-[#00e0a4]/10 disabled:opacity-50"
              >
                {loading ? 'ARCHITECTING AUDIO...' : 'FORGE BLUEPRINT (1 CREDIT)'}
              </button>
            </div>

            {loading && (
              <div className="flex justify-center items-end gap-1 pt-4">
                {['0s', '0.1s', '0.2s', '0.3s', '0.4s', '0.5s'].map((d, i) => <VisualizerBar key={i} delay={d} />)}
              </div>
            )}
          </div>

          <div className="p-8 bg-white/5 border border-white/10 rounded-[32px] text-center">
            <p className="text-[10px] font-black uppercase text-[#00e0a4] mb-4 tracking-widest">Copyright Protocol</p>
            <p className="text-white/40 text-[11px] font-bold leading-relaxed uppercase tracking-tight">
              Our AI emulates stylistic signatures while ensuring all generated content is legally distinct and copyright-free. Use references to guide the vibe, not to copy.
            </p>
          </div>
        </div>

        {/* Output Display */}
        <div className="lg:col-span-8">
          {!result ? (
            <div className="bg-[#121216]/40 p-12 rounded-[48px] border border-dashed border-white/5 text-center flex flex-col items-center justify-center min-h-[600px] opacity-40">
              <span className="text-7xl mb-8 grayscale">🎹</span>
              <p className="text-white/20 font-black uppercase tracking-widest text-xs">Audio Neural Cluster Standby.</p>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-right duration-700 space-y-8 pb-12">
              <div className="bg-[#121216] border border-white/5 p-12 rounded-[56px] relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-[#00e0a4]/5 via-transparent to-transparent pointer-events-none" />
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 border-b border-white/5 pb-10 relative z-10">
                  <div className="flex-grow">
                    <h2 className="text-xs font-black uppercase text-[#00e0a4] tracking-[0.4em] mb-4 italic">Original AI Artist Profile</h2>
                    <h1 className="text-6xl font-black uppercase tracking-tighter text-white leading-none">{result.artist.name}</h1>
                    <p className="text-white/40 text-sm font-medium mt-6 max-w-lg leading-relaxed">{result.artist.bio}</p>
                    <div className="mt-6 flex gap-4">
                      <button 
                        onClick={handleVoicePreview}
                        disabled={generatingVoice}
                        className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${audioUrl ? 'bg-[#00e0a4] text-black' : 'bg-white/5 text-white hover:bg-white hover:text-black border border-white/10'}`}
                      >
                        {generatingVoice ? 'SYNTHESIZING...' : (audioUrl ? 'VOICE SYNCED ✦' : 'GENERATE VOICE SIGNATURE (1 CREDIT)')}
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-4">
                    <button onClick={clearResult} className="text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-white transition-all">New Session</button>
                    {coverArt ? (
                      <img src={coverArt} alt="Cover" className="w-32 h-32 rounded-2xl border border-white/10 shadow-2xl object-cover animate-in zoom-in duration-500" />
                    ) : (
                      <button 
                        onClick={handleGenerateArt}
                        disabled={generatingArt}
                        className="w-32 h-32 rounded-2xl border border-dashed border-white/10 flex flex-col items-center justify-center text-[10px] font-black uppercase text-white/20 hover:text-white hover:border-white/30 transition-all group"
                      >
                        {generatingArt ? 'FORGING...' : (
                          <>
                            <span className="text-2xl mb-2 group-hover:scale-110 transition-transform">🖼️</span>
                            Forge Cover
                            <span className="mt-1 opacity-40">(1 Credit)</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 relative z-10">
                  <section className="space-y-10">
                    <div>
                      <h4 className="text-[10px] font-black uppercase text-white/30 mb-6 tracking-[0.3em]">Lyrics Architecture</h4>
                      <div className="space-y-8 bg-[#0b0b0c] p-10 rounded-[40px] border border-white/5 shadow-inner">
                        <div>
                          <p className="text-[9px] font-black text-[#00e0a4] uppercase mb-4 tracking-widest">[The Hook]</p>
                          <p className="text-lg font-black text-white italic leading-relaxed whitespace-pre-wrap">{result.lyrics.hook}</p>
                        </div>
                        <div>
                          <p className="text-[9px] font-black text-white/20 uppercase mb-4 tracking-widest">[Verse 1]</p>
                          <p className="text-sm font-medium text-white/60 leading-relaxed whitespace-pre-wrap">{result.lyrics.verse1}</p>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section className="space-y-10">
                    <div>
                      <h4 className="text-[10px] font-black uppercase text-white/30 mb-6 tracking-[0.3em]">Production Metadata</h4>
                      <div className="grid grid-cols-3 gap-3 mb-6">
                        <div className="p-4 bg-[#0b0b0c] border border-white/5 rounded-2xl text-center">
                          <p className="text-[8px] font-black text-white/20 uppercase tracking-widest mb-1">Tempo</p>
                          <p className="text-xl font-black text-white">{result.production.bpm} BPM</p>
                        </div>
                        <div className="p-4 bg-[#0b0b0c] border border-white/5 rounded-2xl text-center">
                          <p className="text-[8px] font-black text-white/20 uppercase tracking-widest mb-1">Key</p>
                          <p className="text-xl font-black text-[#00e0a4]">{result.production.key}</p>
                        </div>
                        <div className="p-4 bg-[#0b0b0c] border border-white/5 rounded-2xl text-center">
                          <p className="text-[8px] font-black text-white/20 uppercase tracking-widest mb-1">Length</p>
                          <p className="text-xl font-black text-white">{result.production.songLength}</p>
                        </div>
                      </div>
                      
                      <div className="p-8 bg-white/5 border border-white/10 rounded-[32px] mb-8">
                        <h5 className="text-[10px] font-black uppercase text-[#00e0a4] mb-3 tracking-widest">Sonic DNA Interpretation</h5>
                        <p className="text-xs text-white/60 leading-relaxed font-bold uppercase tracking-tight italic">
                          "{result.production.sonicDNA}"
                        </p>
                      </div>

                      <div className="space-y-4">
                        <h5 className="text-[10px] font-black uppercase text-white/40 mb-3 tracking-widest">Beat Takes ({result.production.beatVariations?.length})</h5>
                        {result.production.beatVariations?.map((take: string, idx: number) => (
                           <div key={idx} className="p-6 bg-[#0b0b0c] border border-white/5 rounded-[24px] relative overflow-hidden group">
                             <div className="absolute top-0 right-0 p-3 bg-[#00e0a4]/10 text-[#00e0a4] text-[8px] font-black uppercase rounded-bl-xl">Take {idx + 1}</div>
                             <p className="text-[11px] text-white/70 leading-relaxed font-medium uppercase tracking-tight italic">"{take}"</p>
                           </div>
                        ))}
                      </div>
                    </section>
                  </div>

                  <div className="mt-16 pt-12 border-t border-white/5 relative z-10 text-center">
                    <p className="text-[10px] font-black uppercase text-white/20 tracking-[0.5em] mb-6">Built by ANAI.ai Neural Distribution Cluster</p>
                    <div className="flex justify-center gap-4">
                       <a href="https://hsw365media.com" target="_blank" className="bg-white text-black px-12 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-[#00e0a4] transition-all shadow-xl">List on Media Hub ↗</a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
  );
};

export default MusicLab;
