
import React from 'react';

const Podcast: React.FC = () => {
  return (
    <div className="px-6 py-12 max-w-5xl mx-auto space-y-12">
      <div className="text-center">
        <h1 className="text-5xl font-black mb-4 uppercase tracking-tighter">RESPECT <span className="text-[#00e0a4]">DA GAME</span></h1>
        <p className="text-[#a0a0a7] text-lg max-w-2xl mx-auto italic">
          "Real talk from the frontlines of the indie industry. Hosted by Hoodstar365."
        </p>
      </div>

      <div className="w-full bg-black rounded-3xl overflow-hidden shadow-2xl border border-[#1e1e23]">
        <iframe 
          title="Respect Da Game Podcast" 
          src="https://embed.podcasts.apple.com/us/podcast/respect-da-game-podcast/id1550224983?theme=dark" 
          height="450" 
          className="w-full border-0"
          sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation" 
          loading="lazy"
        ></iframe>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-[#121216] p-8 rounded-3xl border border-[#1e1e23]">
          <h3 className="text-xl font-black mb-4 uppercase">Latest Episode</h3>
          <p className="text-[#a0a0a7] text-sm leading-relaxed mb-6">
            In our latest episode, we sit down with the underground legends pushing the boundaries of the digital landscape. 
            We discuss AI in music, the death of traditional major labels, and how to stay independent in 2025.
          </p>
          <a href="#" className="text-[#00e0a4] font-bold text-sm uppercase tracking-widest border-b-2 border-[#00e0a4] pb-1">Listen Notes</a>
        </div>
        <div className="bg-[#121216] p-8 rounded-3xl border border-[#1e1e23]">
          <h3 className="text-xl font-black mb-4 uppercase">Featured Artists</h3>
          <ul className="space-y-4">
            {['Ghost Mane', 'Indigo Child', 'The 365 Collective'].map((artist, idx) => (
              <li key={idx} className="flex justify-between items-center border-b border-[#1e1e23] pb-2">
                <span className="font-bold">{artist}</span>
                <span className="text-[10px] bg-white/10 px-2 py-1 rounded text-[#a0a0a7] uppercase">EP {42 - idx}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Podcast;
