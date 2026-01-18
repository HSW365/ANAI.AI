
import React from 'react';

const Privacy: React.FC = () => {
  return (
    <div className="px-6 py-12 max-w-3xl mx-auto min-h-screen text-white/70 leading-relaxed">
      <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-8">Privacy <span className="text-[#00e0a4]">Policy</span></h1>
      <p className="text-xs font-black uppercase tracking-widest text-white/30 mb-8">Last Updated: May 2024</p>
      
      <section className="space-y-6 text-sm">
        <div className="p-6 bg-[#121216] border border-white/5 rounded-2xl">
          <h2 className="text-white font-black uppercase mb-4 tracking-widest">1. Data Collection</h2>
          <p>ANAI.ai collects minimal data required for neural generation. This includes your brand preferences, music concepts, and wallet addresses if connected. We do not sell your personal data to third parties.</p>
        </div>

        <div className="p-6 bg-[#121216] border border-white/5 rounded-2xl">
          <h2 className="text-white font-black uppercase mb-4 tracking-widest">2. AI Training</h2>
          <p>Inputs provided to our neural engines (Gemini 3.0 Pro/Flash) are processed securely. Your unique IP (lyrics, designs, code) remains your property. We do not use user-specific blueprints to train public models without explicit consent.</p>
        </div>

        <div className="p-6 bg-[#121216] border border-white/5 rounded-2xl">
          <h2 className="text-white font-black uppercase mb-4 tracking-widest">3. Security</h2>
          <p>We use industry-standard AES-256 encryption for data at rest. Wallet connections are handled via secure provider protocols (MetaMask/WalletConnect) and we never have access to your private keys.</p>
        </div>

        <div className="p-6 bg-[#121216] border border-white/5 rounded-2xl">
          <h2 className="text-white font-black uppercase mb-4 tracking-widest">4. Your Rights</h2>
          <p>Users may request complete account deletion and data wiping at any time via the support hub. We comply with GDPR and CCPA standards for digital ownership.</p>
        </div>
      </section>

      <div className="mt-12 text-center pb-20">
        <p className="text-[10px] font-black uppercase text-white/20 tracking-[0.4em]">Hoodstar365 Infrastructure Protected</p>
      </div>
    </div>
  );
};

export default Privacy;
