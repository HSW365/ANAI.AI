
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Booking: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.ok) {
        setSubmitted(true);
      } else {
        setError(data.error || "System error. Please retry.");
      }
    } catch (e) {
      setError("Network connection fault.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="px-6 py-20 text-center max-w-xl mx-auto">
        <div className="text-6xl mb-6 text-[#00e0a4] animate-bounce">🗓️</div>
        <h2 className="text-4xl font-black mb-4 uppercase tracking-tighter leading-none">Request Logged</h2>
        <p className="text-[#a0a0a7] mb-10 leading-relaxed font-medium uppercase tracking-widest text-sm">
          Our scheduling team will review your organization's request and reach out within 24 business hours to finalize dates.
        </p>
        <button 
          onClick={() => setSubmitted(false)}
          className="bg-[#00e0a4] text-[#041b14] px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white transition-all shadow-xl"
        >
          New Booking
        </button>
      </div>
    );
  }

  return (
    <div className="px-6 py-12 max-w-4xl mx-auto min-h-screen">
      <div className="mb-10">
        <h1 className="text-4xl font-black mb-2 uppercase tracking-tighter">BOOK A <span className="text-[#00e0a4]">FEATURE</span></h1>
        <p className="text-[#a0a0a7] text-xs font-bold uppercase tracking-widest mt-2">Secure a spot on the podcast, a radio interview, or a dedicated promo campaign.</p>
      </div>

      <form onSubmit={handleBooking} className="bg-[#121216] border border-white/5 p-10 rounded-[40px] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#00e0a4]/5 blur-[60px] rounded-full pointer-events-none" />
        
        <div className="grid md:grid-cols-2 gap-8 relative z-10">
          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-black uppercase text-white/40 mb-3 tracking-widest">Organization / Artist</label>
              <input required name="org" type="text" className="w-full bg-[#0b0b0c] border border-white/5 p-4 rounded-xl focus:border-[#00e0a4] outline-none text-sm font-bold" placeholder="Agency or Stage Name" />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase text-white/40 mb-3 tracking-widest">Contact Email</label>
              <input required name="email" type="email" className="w-full bg-[#0b0b0c] border border-white/5 p-4 rounded-xl focus:border-[#00e0a4] outline-none text-sm font-bold" placeholder="management@example.com" />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase text-white/40 mb-3 tracking-widest">Preferred Date</label>
              <input required name="date" type="date" className="w-full bg-[#0b0b0c] border border-white/5 p-4 rounded-xl focus:border-[#00e0a4] outline-none text-sm font-bold" />
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-black uppercase text-white/40 mb-3 tracking-widest">Booking Type</label>
              <select name="type" className="w-full bg-[#0b0b0c] border border-white/5 p-4 rounded-xl focus:border-[#00e0a4] outline-none text-sm font-bold appearance-none">
                <option>Podcast Interview</option>
                <option>Radio Spotlight</option>
                <option>Social Media Takeover</option>
                <option>Live Event Hosting</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase text-white/40 mb-3 tracking-widest">Project Notes</label>
              <textarea name="notes" className="w-full bg-[#0b0b0c] border border-white/5 p-4 rounded-xl focus:border-[#00e0a4] outline-none text-sm font-medium min-h-[140px]" placeholder="Tell us about the project..."></textarea>
            </div>
          </div>
        </div>
        
        {error && (
          <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-[10px] font-black uppercase tracking-widest text-center">
            {error}
          </div>
        )}

        <div className="mt-10 pt-6 border-t border-white/5">
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#00e0a4] text-[#041b14] py-6 rounded-2xl font-black text-xl uppercase tracking-widest hover:bg-white transition-all shadow-xl"
          >
            {loading ? 'PROCESSING REQUEST...' : 'SUBMIT BOOKING REQUEST'}
          </button>
          <div className="mt-6 flex flex-col items-center gap-2">
            <Link to="/terms" className="text-[9px] text-white/20 uppercase font-bold tracking-widest hover:text-white transition-all">Subject to HSW365 Global Booking Terms</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Booking;
