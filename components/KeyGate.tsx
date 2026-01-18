
import React, { useState, useEffect } from 'react';

const KeyGate: React.FC<{ onValidated: () => void }> = ({ onValidated }) => {
  const [isValidating, setIsValidating] = useState(true);

  useEffect(() => {
    const checkKey = async () => {
      // Check if user has already selected a key
      const hasKey = await (window as any).aistudio.hasSelectedApiKey();
      if (hasKey) {
        onValidated();
      } else {
        setIsValidating(false);
      }
    };
    checkKey();
  }, [onValidated]);

  const handleOpenSelect = async () => {
    try {
      await (window as any).aistudio.openSelectKey();
      // Assume success as per instructions to avoid race conditions
      onValidated();
    } catch (e) {
      alert("System Error: Unable to open key selection.");
    }
  };

  if (isValidating) return null;

  return (
    <div className="fixed inset-0 z-[100] glass flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-[#121216] border border-white/5 p-12 rounded-[48px] shadow-2xl space-y-8">
        <div className="text-6xl">🔒</div>
        <h2 className="text-3xl font-black uppercase tracking-tighter leading-none">
          SECURE NEURAL <br/><span className="text-[#00e0a4]">ACCESS REQUIRED</span>
        </h2>
        <p className="text-white/40 text-sm font-medium leading-relaxed uppercase tracking-widest">
          To access Pro-Tier 4K Vision and High-Fidelity Audio, you must authenticate with your own API key. 
          <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="block mt-4 text-[#00e0a4] text-[10px] font-black underline">View Billing Documentation</a>
        </p>
        <button 
          onClick={handleOpenSelect}
          className="w-full bg-[#00e0a4] text-black py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white transition-all shadow-xl shadow-[#00e0a4]/10"
        >
          Select Secure Key
        </button>
        <p className="text-[8px] font-black text-white/10 uppercase tracking-[0.4em]">Powered by HSW365 Infrastructure</p>
      </div>
    </div>
  );
};

export default KeyGate;
