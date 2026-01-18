
import React from 'react';
import { Link } from 'react-router-dom';

const FeatureCard: React.FC<{ title: string; desc: string; icon: string; link: string; color: string; external?: boolean }> = ({ title, desc, icon, link, color, external }) => {
  const CardContent = (
    <div className="bg-[#121216] border border-white/5 p-8 rounded-[32px] hover:border-[#00e0a4]/40 transition-all group relative overflow-hidden h-full">
      <div className={`absolute -right-4 -top-4 w-24 h-24 blur-3xl opacity-10 rounded-full ${color}`} />
      <div className="text-4xl mb-6 group-hover:scale-110 transition-transform relative z-10">{icon}</div>
      <h3 className="text-xl font-black mb-3 uppercase tracking-tighter relative z-10">{title}</h3>
      <p className="text-white/50 text-sm leading-relaxed relative z-10">{desc}</p>
      {external && (
        <div className="mt-4 text-[10px] font-black text-[#00e0a4] uppercase tracking-widest relative z-10 flex items-center gap-2">
          Visit Network Site <span className="text-xs">↗</span>
        </div>
      )}
    </div>
  );

  if (external) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className="block">
        {CardContent}
      </a>
    );
  }

  return (
    <Link to={link} className="block">
      {CardContent}
    </Link>
  );
};

const Home: React.FC = () => {
  return (
    <div className="px-6 py-12 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="mb-24 text-center lg:text-left lg:flex lg:items-center lg:gap-16">
        <div className="lg:flex-1">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 mb-8">
            <span className="w-2 h-2 bg-[#00e0a4] rounded-full animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">The Future of Ownership is Here</span>
          </div>
          <h1 className="text-6xl lg:text-8xl font-black mb-8 leading-[0.9] tracking-tighter">
            BUILD ONCE. <br/>
            <span className="text-[#00e0a4]">OWN FOREVER.</span>
          </h1>
          <p className="text-xl text-white/50 mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
            ANAI.ai is an AI-powered creation and automation platform designed to help creators, entrepreneurs, and artists turn ideas into real digital products and income streams.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
            <Link to="/meme-lab" className="bg-[#00e0a4] text-[#041b14] px-10 py-5 rounded-2xl font-black text-xl shadow-[0_20px_40px_rgba(0,224,164,0.2)] hover:scale-105 hover:bg-white transition-all uppercase tracking-tighter">
              Forge Token
            </Link>
            <Link to="/music-lab" className="bg-white/5 border border-white/10 text-white px-10 py-5 rounded-2xl font-black text-xl hover:bg-white/10 transition-all uppercase tracking-tighter">
              Produce Music
            </Link>
          </div>
        </div>
        <div className="hidden lg:block lg:flex-1">
          <div className="relative">
            <div className="absolute -inset-10 bg-[#00e0a4]/10 blur-[120px] rounded-full" />
            <div className="relative glass border border-white/10 rounded-[60px] p-4 overflow-hidden shadow-2xl">
               <img 
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop" 
                alt="AI Visual" 
                className="rounded-[44px] w-full aspect-[4/5] object-cover grayscale opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0c] via-transparent to-transparent" />
              <div className="absolute bottom-12 left-12 right-12">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl">
                  <p className="text-white font-black text-lg mb-1 uppercase tracking-tighter">System Status: Active</p>
                  <p className="text-white/60 text-xs font-bold uppercase tracking-widest">Neural Creation Engine Optimized</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid Features */}
      <section className="mb-24">
        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-white/20 mb-10 text-center lg:text-left">Neural Feature Clusters</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            title="Music Studio" 
            desc="Architect AI artists, lyrics, and production notes for copyright-free anthems. Global distribution ready." 
            icon="🎙️" 
            link="/music-lab" 
            color="bg-red-500"
          />
          <FeatureCard 
            title="Meme Forge" 
            desc="Architect viral tokens with high-stakes tokenomics and full exchange listing protocols." 
            icon="💎" 
            link="/meme-lab" 
            color="bg-[#00e0a4]"
          />
          <FeatureCard 
            title="ANAI Capital" 
            desc="Generate professional venture theses and support the ecosystem with $HSW365 community funding." 
            icon="💰" 
            link="/capital" 
            color="bg-purple-500"
          />
          <FeatureCard 
            title="Empire Commerce" 
            desc="Generate digital product sales engines, pricing strategies, and high-conversion web blueprints." 
            icon="🛒" 
            link="/ecommerce" 
            color="bg-blue-500"
          />
          <FeatureCard 
            title="Neural App Architect" 
            desc="Architect full mobile applications with complete technical blueprints and store deployment guides." 
            icon="📱" 
            link="/app-builder" 
            color="bg-yellow-500"
          />
          <FeatureCard 
            title="AI Creation Engine" 
            desc="Generate eBooks, course outlines, and business plans instantly. No tech skills required." 
            icon="⚡" 
            link="/build" 
            color="bg-pink-500"
          />
        </div>
      </section>

      {/* Ecosystem Section */}
      <section className="mb-24">
        <div className="p-12 bg-white/5 border border-white/10 rounded-[48px] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-5 select-none font-black text-9xl">OFFICIAL</div>
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">Official Network <span className="text-[#00e0a4]">Ecosystem</span></h2>
          <p className="text-white/40 text-sm font-medium uppercase tracking-widest mb-10 max-w-xl">
            Access the primary distribution channels of the ANAI network. Shop official gear and premium digital assets.
          </p>
          <div className="grid md:grid-cols-2 gap-8 relative z-10">
            <FeatureCard 
              title="HSW365.CO" 
              desc="The official flagship store for premium Hoodstar365 apparel and streetwear drops." 
              icon="👕" 
              link="https://hsw365.co" 
              color="bg-[#00e0a4]"
              external
            />
            <FeatureCard 
              title="HSW365 MEDIA" 
              desc="The central hub for premium eBooks, App Blueprints, and digital media assets." 
              icon="📂" 
              link="https://hsw365media.com" 
              color="bg-white"
              external
            />
          </div>
        </div>
      </section>

      {/* App Store Mandatory Footer */}
      <footer className="mt-12 mb-20 pt-12 border-t border-white/5 flex flex-col items-center">
        <div className="flex gap-8 mb-6">
          <Link to="/privacy" className="text-[10px] font-black uppercase text-white/20 hover:text-[#00e0a4] tracking-widest transition-all">Privacy Policy</Link>
          <Link to="/terms" className="text-[10px] font-black uppercase text-white/20 hover:text-[#00e0a4] tracking-widest transition-all">Terms of Service</Link>
        </div>
        <p className="text-[8px] font-bold text-white/10 uppercase tracking-widest">© 2024 ANAI.ai & Hoodstar365. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
