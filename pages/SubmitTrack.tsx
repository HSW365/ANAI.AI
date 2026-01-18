
import React, { useState } from 'react';
// Added missing import for Link from react-router-dom
import { Link } from 'react-router-dom';

const SubmitTrack: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    
    try {
      const res = await fetch('/api/submit-track', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.ok) {
        setSuccess(true);
      } else {
        setError(data.error || "Upload failed. Verify file format.");
      }
    } catch (e) {
      setError("Network fault. Please retry.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="px-6 py-20 text-center max-w-xl mx-auto">
        <div className="text-6xl mb-6 text-[#00e0a4] animate-bounce">✓</div>
        <h2 className="text-4xl font-black mb-4 uppercase tracking-tighter">Track Received!</h2>
        <p className="text-[#a0a0a7] mb-10 leading-relaxed font-medium uppercase tracking-tight text-sm">
          Our A&R team and neural analysis engine are reviewing your submission. 
          Expect a response at your email within 48 hours.
        </p>
        <button 
          onClick={() => setSuccess(false)}
          className="bg-[#00e0a4] text-[#041b14] px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white transition-all shadow-xl"
        >
          Submit Another
        </button>
      </div>
    );
  }

  return (
    <div className="px-6 py-12 max-w-4xl mx-auto min-h-screen">
      <div className="mb-10">
        <h1 className="text-4xl font-black mb-2 uppercase tracking-tighter leading-none">SUBMIT YOUR <span className="text-[#00e0a4]">TRACK</span></h1>
        <p className="text-[#a0a0a7] text-xs font-bold uppercase tracking-widest mt-2">Get heard on the world's most powerful indie rotation platform.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2 bg-[#121216] border border-white/5 p-10 rounded-[40px] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#00e0a4]/5 blur-[60px] rounded-full pointer-events-none" />
        
        <div className="space-y-6 relative z-10">
          <div>
            <label className="block text-[10px] font-black uppercase text-white/40 mb-3 tracking-widest">Artist Name</label>
            <input required name="artist" type="text" className="w-full bg-[#0b0b0c] border border-white/5 p-4 rounded-xl focus:border-[#00e0a4] outline-none transition-all text-sm font-bold" placeholder="e.g. Young Legend" />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase text-white/40 mb-3 tracking-widest">Song Title</label>
            <input required name="title" type="text" className="w-full bg-[#0b0b0c] border border-white/5 p-4 rounded-xl focus:border-[#00e0a4] outline-none transition-all text-sm font-bold" placeholder="e.g. Grind Mode" />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase text-white/40 mb-3 tracking-widest">Contact Email</label>
            <input required name="email" type="email" className="w-full bg-[#0b0b0c] border border-white/5 p-4 rounded-xl focus:border-[#00e0a4] outline-none transition-all text-sm font-bold" placeholder="name@example.com" />
          </div>
        </div>

        <div className="space-y-6 relative z-10">
          <div>
            <label className="block text-[10px] font-black uppercase text-white/40 mb-3 tracking-widest">Audio Master (MP3/WAV)</label>
            <div className="relative border-2 border-dashed border-white/5 rounded-2xl p-8 text-center hover:border-[#00e0a4]/30 transition-all group cursor-pointer bg-[#0b0b0c]">
              <input required name="audio" type="file" accept=".mp3,.wav" className="absolute inset-0 opacity-0 cursor-pointer" />
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🎧</div>
              <p className="text-[10px] text-white/30 uppercase font-black tracking-widest">Click to upload or drag & drop</p>
              <p className="text-[8px] text-[#00e0a4] mt-2 font-black uppercase">Max file size: 50MB</p>
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase text-white/40 mb-3 tracking-widest">Sonic Vision</label>
            <textarea className="w-full bg-[#0b0b0c] border border-white/5 p-4 rounded-xl focus:border-[#00e0a4] outline-none transition-all text-sm font-medium min-h-[100px]" placeholder="Tell us the concept..."></textarea>
          </div>
        </div>

        {error && (
          <div className="md:col-span-2 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-[10px] font-black uppercase tracking-widest text-center">
            {error}
          </div>
        )}

        <div className="md:col-span-2 pt-6">
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#00e0a4] text-[#041b14] py-6 rounded-2xl font-black text-xl uppercase tracking-widest hover:bg-white transition-all disabled:opacity-50 shadow-xl shadow-[#00e0a4]/10"
          >
            {loading ? 'UPLOADING TO NEURAL CLUSTER...' : 'SEND SUBMISSION'}
          </button>
          <div className="mt-6 flex flex-col items-center gap-2">
            <Link to="/terms" className="text-[9px] text-white/20 uppercase font-bold tracking-widest hover:text-white transition-all">By submitting, you agree to our EULA & Terms</Link>
            <p className="text-[8px] text-white/10 uppercase font-black">Powered by HSW365 Infrastructure</p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SubmitTrack;
