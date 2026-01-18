
import React, { useState, useEffect } from 'react';
import { creditService } from '../services/creditService';
import { useNavigate } from 'react-router-dom';

const PricingCard: React.FC<{ 
  tier: string; 
  price: string; 
  credits: number;
  description: string;
  features: string[]; 
  isPopular?: boolean; 
  isVip?: boolean;
}> = ({ tier, price, credits, description, features, isPopular, isVip }) => {
  const navigate = useNavigate();
  
  const handleSelect = () => {
    // Note: In a live App Store environment, this would call native IAP
    creditService.setCredits(credits);
    alert(`NEURAL SYNC COMPLETE: ${credits === 999 ? 'Infinity' : credits} Credits added to your Neural Vault via Secure App Store Protocol.`);
    navigate('/');
  };

  return (
    <div className={`relative p-[1px] rounded-[48px] transition-all duration-700 hover:scale-[1.02] ${isPopular ? 'bg-gradient-to-b from-[#00e0a4] to-transparent scale-105 z-10' : isVip ? 'bg-gradient-to-b from-purple-500 to-transparent' : 'bg-white/10'}`}>
      {/* Glow Effect for Premium Tiers */}
      {(isPopular || isVip) && (
        <div className={`absolute inset-0 blur-[40px] opacity-20 rounded-[48px] -z-10 ${isVip ? 'bg-purple-500' : 'bg-[#00e0a4]'}`} />
      )}
      
      <div className="relative h-full bg-[#0b0b0c] rounded-[47px] p-10 flex flex-col">
        {isPopular && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#00e0a4] text-[#041b14] px-6 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-xl">
            Most Popular
          </div>
        )}

        <div className="mb-8">
          <h3 className={`text-xs font-black uppercase tracking-[0.4em] mb-3 ${isVip ? 'text-purple-400' : isPopular ? 'text-[#00e0a4]' : 'text-white/40'}`}>{tier}</h3>
          <div className="flex items-baseline gap-1">
            <span className="text-6xl font-black text-white">{price}</span>
            <span className="text-white/20 text-sm font-bold">/MO</span>
          </div>
          <p className="text-white/40 text-xs mt-4 font-medium leading-relaxed uppercase tracking-widest">{description}</p>
        </div>

        <div className="bg-white/5 rounded-2xl p-5 mb-8 border border-white/5">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">Neural Volume</span>
            <span className={`text-xs font-black ${isVip ? 'text-purple-400' : 'text-[#00e0a4]'}`}>
              {credits === 999 ? 'UNLIMITED' : `${credits} CREDITS`}
            </span>
          </div>
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
            <div className={`h-full rounded-full ${isVip ? 'bg-purple-500' : 'bg-[#00e0a4]'}`} style={{ width: credits === 999 ? '100%' : `${(credits / 100) * 100}%` }} />
          </div>
        </div>

        <ul className="space-y-4 mb-10 flex-grow">
          {features.map((f, i) => (
            <li key={i} className="flex gap-3 text-[11px] font-bold text-white/60 uppercase tracking-tight items-start leading-relaxed">
              <span className={`mt-1 ${isVip ? 'text-purple-400' : 'text-[#00e0a4]'}`}>✦</span>
              {f}
            </li>
          ))}
        </ul>

        <button 
          onClick={handleSelect}
          className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest transition-all duration-300 transform active:scale-95 ${
            isVip ? 'bg-purple-600 text-white hover:bg-white hover:text-black shadow-lg shadow-purple-500/20' : 
            isPopular ? 'bg-[#00e0a4] text-black hover:bg-white shadow-lg shadow-[#00e0a4]/20' : 
            'bg-white/5 text-white border border-white/10 hover:bg-white hover:text-black'
          }`}
        >
          {isVip ? 'Join Inner Circle' : 'Select Access'}
        </button>
      </div>
    </div>
  );
};

const Pricing: React.FC = () => {
  const [currentCredits, setCurrentCredits] = useState(0);

  useEffect(() => {
    return creditService.subscribe(setCurrentCredits);
  }, []);

  return (
    <div className="px-6 py-16 max-w-7xl mx-auto min-h-screen">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <div className="inline-block px-4 py-2 bg-white/5 rounded-full border border-white/10 mb-6">
          <p className="text-[9px] font-black text-[#00e0a4] uppercase tracking-[0.3em]">Neural Vault Balance: {currentCredits === 999 ? '∞' : currentCredits} Credits</p>
        </div>
        <h1 className="text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-6">
          CHOOSE YOUR <br/>
          <span className="text-[#00e0a4]">ACCESS LEVEL</span>
        </h1>
        <p className="text-white/40 text-sm font-bold uppercase tracking-[0.4em] max-w-xl mx-auto">
          Fuel your creator empire with the industry's most advanced neural processing clusters.
        </p>
      </div>

      {/* Grid */}
      <div className="grid lg:grid-cols-3 gap-8 items-stretch mb-24">
        <PricingCard 
          tier="Basic"
          price="$10"
          credits={10}
          description="Perfect for new architects exploring the creator ecosystem."
          features={[
            "10 High-Fidelity Blueprints",
            "Access to Music & Utility Lab",
            "Standard GPU priority",
            "Community Support access",
            "Basic metadata exports"
          ]}
        />
        
        <PricingCard 
          tier="Pro"
          price="$15"
          credits={50}
          isPopular
          description="The professional choice for scaling digital assets."
          features={[
            "50 High-Fidelity Blueprints",
            "Full Lab Access (All Engines)",
            "Priority GPU processing",
            "Advanced growth strategy kits",
            "White-label blueprint exports",
            "Multi-language support"
          ]}
        />

        <PricingCard 
          tier="VIP"
          price="$20"
          credits={999}
          isVip
          description="Ultimate power for high-volume creation."
          features={[
            "Unlimited Neural Generations",
            "Tier 1 GPU Cluster Access",
            "Custom AI Voice Training",
            "1-on-1 Growth Blueprinting",
            "HSW365 Media Hub Featured Listing",
            "Private Founders Lounge"
          ]}
        />
      </div>

      {/* Mandatory Apple Purchase Info */}
      <div className="p-8 bg-white/5 border border-white/10 rounded-3xl mb-12 text-center">
         <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] leading-relaxed">
           Subscriptions will be charged to your App Store account at confirmation of purchase. Subscriptions will automatically renew unless canceled within 24-hours before the end of the current period. Manage or cancel in your App Store Account Settings. Credits are digital utility tokens used to access platform processing features.
         </p>
      </div>

      {/* FAQ / Trust Section */}
      <div className="bg-[#121216] border border-white/5 rounded-[60px] p-16 relative overflow-hidden flex flex-col lg:flex-row items-center gap-16 shadow-2xl">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#00e0a4]/5 blur-[120px] rounded-full" />
        <div className="flex-1 space-y-8 relative z-10">
           <h2 className="text-4xl font-black uppercase tracking-tighter leading-none">
             ENTERPRISE & <br/><span className="text-[#00e0a4]">INSTITUTIONAL</span>
           </h2>
           <p className="text-white/40 text-sm font-bold leading-relaxed uppercase tracking-widest max-w-md">
             Need custom API integrations, massive server clusters, or global white-label distribution rights? Let's build your custom infrastructure.
           </p>
           <button className="bg-white text-black px-12 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-[#00e0a4] transition-all shadow-xl">
             Connect With Sales
           </button>
        </div>
        
        <div className="flex-1 grid grid-cols-2 gap-4 relative z-10">
          {[
            { label: 'Uptime', val: '99.9%' },
            { label: 'Security', val: 'AES-256' },
            { label: 'Nodes', val: 'Global' },
            { label: 'Support', val: '24/7 VIP' }
          ].map((stat, i) => (
            <div key={i} className="p-8 bg-white/5 border border-white/10 rounded-[32px] text-center">
              <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-xl font-black text-[#00e0a4]">{stat.val}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20 text-center pb-20">
        <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.5em] mb-4">Secured by Hoodstar365 Infrastructure</p>
        <div className="flex justify-center gap-8 opacity-30 grayscale contrast-150">
          <span className="text-xs font-black tracking-tighter">APP STORE SECURE</span>
          <span className="text-xs font-black tracking-tighter">APPLE PAY</span>
          <span className="text-xs font-black tracking-tighter">HSW365 CLOUD</span>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
