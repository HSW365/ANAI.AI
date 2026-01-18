
import React, { useState } from 'react';

const ProductCard: React.FC<{ name: string; price: string; img: string; desc: string }> = ({ name, price, img, desc }) => {
  const [isOrdering, setIsOrdering] = useState(false);

  const handleCheckout = () => {
    setIsOrdering(true);
    // Redirect to the flagship store for real checkout
    setTimeout(() => {
      window.location.href = "https://hsw365.co";
      setIsOrdering(false);
    }, 1000);
  };

  return (
    <div className="bg-[#121216] border border-[#1e1e23] rounded-3xl overflow-hidden group h-full flex flex-col">
      <div className="aspect-square overflow-hidden bg-[#0b0b0c] relative">
        <img src={img} alt={name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute top-4 right-4 bg-[#00e0a4] text-[#041b14] px-3 py-1 rounded-full text-xs font-black">
          LIMITED DROP
        </div>
      </div>
      <div className="p-8 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-2xl font-black uppercase tracking-tighter">{name}</h3>
          <span className="text-2xl font-black text-[#00e0a4]">{price}</span>
        </div>
        <p className="text-[#a0a0a7] text-sm mb-6 leading-relaxed flex-grow">{desc}</p>
        <button 
          onClick={handleCheckout}
          disabled={isOrdering}
          className="w-full bg-white text-black py-4 rounded-xl font-black uppercase tracking-widest hover:bg-[#00e0a4] transition-colors active:scale-95 disabled:opacity-50"
        >
          {isOrdering ? 'REDIRECTING...' : 'BUY ON HSW365.CO'}
        </button>
      </div>
    </div>
  );
};

const Merch: React.FC = () => {
  return (
    <div className="px-6 py-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <h1 className="text-5xl font-black uppercase tracking-tighter">OFFICIAL <span className="text-[#00e0a4]">MERCH</span></h1>
          <p className="text-[#a0a0a7] text-lg max-w-lg mt-4 uppercase tracking-widest text-xs font-bold">Premium apparel for the indie architect. Built for longevity.</p>
        </div>
        <div className="flex gap-4">
          <a href="https://hsw365.co" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-[#00e0a4] text-[#041b14] rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-[#00e0a4]/10">
            VISIT HSW365.CO
          </a>
          <div className="hidden sm:block px-4 py-2 bg-[#121216] border border-[#1e1e23] rounded-full text-[10px] font-black uppercase tracking-widest text-[#a0a0a7]">
            Global Shipping
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ProductCard 
          name="Architect Tee" 
          price="$45" 
          img="https://picsum.photos/600/600?grayscale" 
          desc="Heavyweight 240GSM cotton. Oversized boxy fit. Signature Hoodstar365 branding." 
        />
        <ProductCard 
          name="Rotation Hoodie" 
          price="$85" 
          img="https://picsum.photos/601/601?grayscale" 
          desc="Custom weave poly-cotton blend. Embossed logo detail. Reinforced stitching." 
        />
        <ProductCard 
          name="Founders Cap" 
          price="$35" 
          img="https://picsum.photos/602/602?grayscale" 
          desc="Unstructured 6-panel design. High-density embroidery. Brass clasp hardware." 
        />
      </div>

      <section className="mt-20 p-12 bg-gradient-to-br from-[#00e0a4]/10 to-transparent rounded-[40px] border border-[#00e0a4]/20 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1">
          <h2 className="text-3xl font-black mb-4 uppercase tracking-tighter">Flagship Store Experience</h2>
          <p className="text-[#a0a0a7] leading-relaxed mb-6 font-medium">
            Our full collection including seasonal drops and exclusive collaborations is hosted on our flagship storefront. 
            Experience high-end distribution at <strong>HSW365.CO</strong>.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-2xl">🌱</span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">Visit HSW365.CO for full catalog</span>
          </div>
        </div>
        <div className="flex-1 text-right">
          <a href="https://hsw365.co" target="_blank" rel="noopener noreferrer" className="inline-block bg-white text-black px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-[#00e0a4] transition-all">
            GO TO STORE ↗
          </a>
        </div>
      </section>
    </div>
  );
};

export default Merch;
