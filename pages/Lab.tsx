
import React, { useState } from 'react';
import { analyzeTrackConcept, generatePromoArt } from '../services/geminiService';
import { AIAnalysisResult } from '../types';
import { creditService } from '../services/creditService';
import { useNavigate } from 'react-router-dom';

const Lab: React.FC = () => {
  const navigate = useNavigate();
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

    if (creditService.getCredits() <= 0) {
      alert("Neural Bank Depleted. Please Top Up.");
      navigate('/pricing');
      return;
    }

    setIsGeneratingArt(true);
    try {
      const url = await generatePromoArt(artPrompt);
      creditService.consumeCredit();
      setGeneratedArt(url);
    } catch (error) {
      console.error(error);
      alert("Error generating art.");
    } finally {
      setIsGeneratingArt(false);
    }
  };

  const handleAnalyzeTrack = async () => {
    if (!artistName || !songTitle) return;

    if (creditService.getCredits() <= 0) {
      alert("Neural Bank Depleted. Please Top Up.");
      navigate('/pricing');
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await analyzeTrackConcept(artistName, songTitle, songDesc);
      creditService.consumeCredit();
      setAnalysis(result);
    } catch (error) {
      console.error(error);
      alert("Error analyzing.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="px-6 py-12 max-w-7xl mx-auto space-y-16">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-5xl font-black mb-4 uppercase tracking-tighter">DESIGN <span className="text-[#00e0a4]">LAB</span></h1>
        <p className="text-white/50 text-lg uppercase tracking-widest text-xs font-bold">Aesthetic Automation & Project Insights</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Art Generator */}
        <section className="bg-[#121216] border border-white/5 p-10 rounded-[48px] space-y-8">
          <div className="flex items-center gap-4">
            <span className="text-4xl">🎨</span>
            <h2 className="text-2xl font-black uppercase tracking-tighter">Brand Engine</h2>
          </div>
          
          <div className="space-y-6">
            <textarea 
              value={artPrompt}
              onChange={(e) => setArtPrompt(e.target.value)}
              className="w-full bg-[#0b0b0c] border border-white/5 p-6 rounded-2xl focus:border-[#00e0a4] outline-none min-h-[120px] text-sm"
              placeholder="Describe your brand aesthetic: e.g. Minimalist high-end skincare packaging, monochrome photography..."
            />
            <button 
              onClick={handleGenerateArt}
              disabled={isGeneratingArt || !artPrompt}
              className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase tracking-widest disabled:opacity-50 hover:bg-[#00e0a4] transition-all shadow-xl"
            >
              {isGeneratingArt ? 'GENERATING DESIGN...' : 'CREATE VISUAL (1 CREDIT)'}
            </button>
          </div>

          {generatedArt && (
            <div className="mt-6 animate-in fade-in zoom-in duration-500">
              <img src={generatedArt} alt="AI Generated" className="w-full rounded-[32px] border border-white/5 shadow-2xl grayscale hover:grayscale-0 transition-all duration-700" />
            </div>
          )}
        </section>

        {/* Track Analyzer */}
        <section className="bg-[#121216] border border-white/5 p-10 rounded-[48px] space-y-8">
          <div className="flex items-center gap-4">
            <span className="text-4xl">🔬</span>
            <h2 className="text-2xl font-black uppercase tracking-tighter">Project Audit</h2>
          </div>
          
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <input 
                value={artistName}
                onChange={(e) => setArtistName(e.target.value)}
                className="bg-[#0b0b0c] border border-white/5 p-4 rounded-xl focus:border-[#00e0a4] outline-none text-sm"
                placeholder="Owner/Name"
              />
              <input 
                value={songTitle}
                onChange={(e) => setSongTitle(e.target.value)}
                className="bg-[#0b0b0c] border border-white/5 p-4 rounded-xl focus:border-[#00e0a4] outline-none text-sm"
                placeholder="Project Title"
              />
            </div>
            <textarea 
              value={songDesc}
              onChange={(e) => setSongDesc(e.target.value)}
              className="w-full bg-[#0b0b0c] border border-white/5 p-4 rounded-xl focus:border-[#00e0a4] outline-none min-h-[120px] text-sm"
              placeholder="Tell the neural engine about the core concept..."
            />
            <button 
              onClick={handleAnalyzeTrack}
              disabled={isAnalyzing || !artistName || !songTitle}
              className="w-full bg-[#00e0a4] text-[#041b14] py-5 rounded-2xl font-black uppercase tracking-widest disabled:opacity-50"
            >
              {isAnalyzing ? 'AUDITING...' : 'RUN NEURAL AUDIT (1 CREDIT)'}
            </button>
          </div>

          {analysis && (
            <div className="mt-8 space-y-4 animate-in slide-in-from-bottom duration-500">
              <div className="p-6 bg-[#0b0b0c] rounded-2xl border-l-4 border-[#00e0a4]">
                <h4 className="text-[10px] font-black uppercase text-[#00e0a4] mb-2 tracking-widest">Sentiment Audit</h4>
                <p className="text-sm text-white/70">{analysis.sentiment}</p>
              </div>
              <div className="p-6 bg-[#0b0b0c] rounded-2xl border-l-4 border-[#00e0a4]">
                <h4 className="text-[10px] font-black uppercase text-[#00e0a4] mb-2 tracking-widest">Growth Critique</h4>
                <p className="text-sm text-white/50 italic leading-relaxed">{analysis.aiCritique}</p>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Lab;
