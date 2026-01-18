
import React from 'react';

const Terms: React.FC = () => {
  return (
    <div className="px-6 py-12 max-w-3xl mx-auto min-h-screen text-white/70 leading-relaxed">
      <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-8">Terms of <span className="text-[#00e0a4]">Service</span></h1>
      <p className="text-xs font-black uppercase tracking-widest text-white/30 mb-8 italic">Standard Creator Protocol & EULA</p>
      
      <section className="space-y-6 text-sm">
        <div className="p-6 bg-[#121216] border border-white/5 rounded-2xl">
          <h2 className="text-white font-black uppercase mb-4 tracking-widest text-[#00e0a4]">1. Standard EULA</h2>
          <p>By downloading or using ANAI.ai, you acknowledge and agree to the Apple Standard Licensed Application End User License Agreement (Standard EULA). We maintain strict moderation for all neural-generated content.</p>
        </div>

        <div className="p-6 bg-[#121216] border border-white/5 rounded-2xl">
          <h2 className="text-white font-black uppercase mb-4 tracking-widest">2. Digital Asset Ownership</h2>
          <p>ANAI.ai facilitates the creation of original digital assets. While the system assists in generation, you retain ownership of your unique blueprints. You are responsible for ensuring that your final creative works do not infringe upon any existing third-party intellectual property or trademarks.</p>
        </div>

        <div className="p-6 bg-[#121216] border border-white/5 rounded-2xl">
          <h2 className="text-white font-black uppercase mb-4 tracking-widest text-red-500">3. Content Safety Policy</h2>
          <p>There is no tolerance for objectionable content or abusive users. Any attempt to generate harmful, defamatory, or illegal content using the ANAI neural engines will result in immediate and permanent account suspension without refund.</p>
        </div>

        <div className="p-6 bg-[#121216] border border-white/5 rounded-2xl">
          <h2 className="text-white font-black uppercase mb-4 tracking-widest">4. Neural Utility Credits</h2>
          <p>Credits used within the platform represent a service fee for cloud processing power. They have no monetary value outside of ANAI.ai and are non-transferable. Subscriptions and purchases are managed via the secure App Store payment infrastructure.</p>
        </div>
      </section>

      <div className="mt-12 text-center pb-20">
        <p className="text-[10px] font-black uppercase text-white/20 tracking-[0.4em]">© 2024 HSW365 Global Infrastructure. Protected.</p>
      </div>
    </div>
  );
};

export default Terms;
