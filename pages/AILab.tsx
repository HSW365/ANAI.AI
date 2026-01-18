
import React, { useState } from 'react';
import { analyzeTrackConcept, generatePromoArt } from '../services/geminiService';
import { AIAnalysisResult } from '../types';

const AILab: React.FC = () => {
  const [artPrompt, setArtPrompt] = useState('');
  const [isGeneratingArt, setIsGeneratingArt] = useState(false);
  const [generatedArt, setGeneratedArt] = useState<string | null>(null);

  const [artistName, setArtistName] = useState('');
  const [songTitle, setSongTitle] = useState('');
  const [songDesc, setSongDesc] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AIAnalysisResult | null>(null);

  const handleGenerateArt = async () => {
    if (!artPrompt) return;
    setIsGeneratingArt(true);
    try {
      const url = await generatePromoArt(artPrompt);
      setGeneratedArt(url);
    } catch (error) {
      console.error(error);
      alert("Error generating art. Make sure your API key is valid.");
    } finally {
      setIsGeneratingArt(false);
    }
  };

  const handleAnalyzeTrack = async () => {
    if (!artistName || !songTitle) return;
    setIsAnalyzing(true);
    try {
      const result = await analyzeTrackConcept(artistName, songTitle, songDesc);
      setAnalysis(result);
    } catch (error) {
      console.error(error);
      alert("Error analyzing track.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="px-6 py-12 max-w-7xl mx-auto space-y-16">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-5xl font-black mb-4 uppercase tracking-tighter">AI <span className="text-[#00e0a4]">LAB</span></h1>
        <p className="text-[#a0a0a7] text-lg">Harness the power of Gemini to supercharge your indie music career. Data-driven insights and creative automation.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Art Generator */}
        <section className="bg-[#121216] border border-[#1e1e23] p-8 rounded-3xl space-y-6">
          <div className="flex items-center gap-4">
            <span className="text-3xl">🎨</span>
            <h2 className="text-2xl font-black uppercase">Promo Art Engine</h2>
          </div>
          <p className="text-[#a0a0a7] text-sm italic">"Generate high-fidelity album covers and social content in seconds."</p>
          
          <div className="space-y-4">
            <textarea 
              value={artPrompt}
              onChange={(e) => setArtPrompt(e.target.value)}
              className="w-full bg-[#0b0b0c] border border-[#1e1e23] p-4 rounded-xl focus:border-[#00e0a4] outline-none min-h-[100px]"
              placeholder="Describe your aesthetic: e.g. Neon cyber-noir, vintage film grain, underground hip-hop vibe..."
            />
            <button 
              onClick={handleGenerateArt}
              disabled={isGeneratingArt || !artPrompt}
              className="w-full bg-white text-black py-4 rounded-xl font-black uppercase tracking-widest disabled:opacity-50 hover:bg-[#00e0a4] transition-all"
            >
              {isGeneratingArt ? 'CREATING...' : 'GENERATE ART'}
            </button>
          </div>

          {generatedArt && (
            <div className="mt-6 animate-in fade-in zoom-in duration-500">
              <img src={generatedArt} alt="AI Generated" className="w-full rounded-2xl border border-[#1e1e23] shadow-2xl" />
              <button className="mt-4 text-[#00e0a4] text-xs font-bold uppercase tracking-widest underline decoration-2 underline-offset-4">
                Download Full Resolution
              </button>
            </div>
          )}
        </section>

        {/* Track Analyzer */}
        <section className="bg-[#121216] border border-[#1e1e23] p-8 rounded-3xl space-y-6">
          <div className="flex items-center gap-4">
            <span className="text-3xl">🔬</span>
            <h2 className="text-2xl font-black uppercase">Track Insights</h2>
          </div>
          <p className="text-[#a0a0a7] text-sm italic">"Deep neural analysis of your track's market positioning."</p>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input 
                value={artistName}
                onChange={(e) => setArtistName(e.target.value)}
                className="bg-[#0b0b0c] border border-[#1e1e23] p-4 rounded-xl focus:border-[#00e0a4] outline-none"
                placeholder="Artist"
              />
              <input 
                value={songTitle}
                onChange={(e) => setSongTitle(e.target.value)}
                className="bg-[#0b0b0c] border border-[#1e1e23] p-4 rounded-xl focus:border-[#00e0a4] outline-none"
                placeholder="Song Title"
              />
            </div>
            <textarea 
              value={songDesc}
              onChange={(e) => setSongDesc(e.target.value)}
              className="w-full bg-[#0b0b0c] border border-[#1e1e23] p-4 rounded-xl focus:border-[#00e0a4] outline-none min-h-[100px]"
              placeholder="Lyrical themes, genre tags, and your vision..."
            />
            <button 
              onClick={handleAnalyzeTrack}
              disabled={isAnalyzing || !artistName || !songTitle}
              className="w-full bg-[#00e0a4] text-[#041b14] py-4 rounded-xl font-black uppercase tracking-widest disabled:opacity-50"
            >
              {isAnalyzing ? 'ANALYZING...' : 'RUN ANALYTICS'}
            </button>
          </div>

          {analysis && (
            <div className="mt-6 space-y-4 animate-in slide-in-from-bottom duration-500">
              <div className="p-4 bg-[#0b0b0c] rounded-xl border-l-4 border-[#00e0a4]">
                <h4 className="text-xs font-bold uppercase text-[#00e0a4] mb-1">Sentiment & Vibe</h4>
                <p className="text-sm">{analysis.sentiment}</p>
              </div>
              <div className="p-4 bg-[#0b0b0c] rounded-xl border-l-4 border-[#00e0a4]">
                <h4 className="text-xs font-bold uppercase text-[#00e0a4] mb-1">Genre/Market Segment</h4>
                <p className="text-sm">{analysis.genreSuggestion}</p>
              </div>
              <div className="p-4 bg-[#0b0b0c] rounded-xl border-l-4 border-[#00e0a4]">
                <h4 className="text-xs font-bold uppercase text-[#00e0a4] mb-1">Marketing Hook</h4>
                <p className="text-sm italic">"{analysis.marketingHook}"</p>
              </div>
              <div className="p-4 bg-[#0b0b0c] rounded-xl border-l-4 border-[#00e0a4]">
                <h4 className="text-xs font-bold uppercase text-[#00e0a4] mb-1">AI Critique</h4>
                <p className="text-sm text-[#a0a0a7] leading-relaxed">{analysis.aiCritique}</p>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default AILab;
