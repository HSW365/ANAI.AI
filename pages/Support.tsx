
import React, { useState } from 'react';

const Support: React.FC = () => {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSupportSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData.entries()))
      });
      if (res.ok) setSent(true);
    } catch (e) {
      alert("System fault. Please email hoodstarent365@gmail.com directly.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="px-6 py-12 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-8">Support <span className="text-[#00e0a4]">Hub</span></h1>
      
      <div className="grid gap-8">
        <section className="bg-[#121216] border border-white/5 p-10 rounded-[40px] shadow-2xl">
          {sent ? (
            <div className="text-center py-10 animate-in zoom-in duration-500">
              <span className="text-6xl mb-6 block">📩</span>
              <h2 className="text-2xl font-black uppercase text-[#00e0a4] mb-2">Message Dispatched</h2>
              <p className="text-white/40 text-sm font-bold uppercase tracking-widest">Our neural ops team will respond within 12h.</p>
              <button onClick={() => setSent(false)} className="mt-8 text-white/20 hover:text-white text-[10px] font-black uppercase tracking-widest">Send Another</button>
            </div>
          ) : (
            <>
              <h2 className="text-xs font-black uppercase text-white/40 mb-8 tracking-widest">Contact ANAI Neural Ops</h2>
              <form onSubmit={handleSupportSubmit} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black uppercase text-white/20 mb-3 tracking-widest">Registered Email</label>
                  <input name="email" required type="email" className="w-full bg-[#0b0b0c] border border-white/5 p-4 rounded-xl focus:border-[#00e0a4] outline-none text-sm font-bold" />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-white/20 mb-3 tracking-widest">Issue / Inquiry</label>
                  <textarea name="message" required className="w-full bg-[#0b0b0c] border border-white/5 p-4 rounded-xl focus:border-[#00e0a4] outline-none text-sm font-medium min-h-[150px]" placeholder="How can we help your empire today?" />
                </div>
                <button 
                  disabled={sending}
                  className="w-full bg-[#00e0a4] text-black py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white transition-all disabled:opacity-50"
                >
                  {sending ? 'DISPATCHING...' : 'SEND MESSAGE'}
                </button>
              </form>
            </>
          )}
        </section>

        <section className="grid sm:grid-cols-2 gap-4">
          <div className="p-8 bg-[#121216] border border-white/5 rounded-[32px] text-center">
            <h3 className="text-[10px] font-black uppercase text-white/30 mb-2 tracking-widest">Direct Email</h3>
            <p className="text-xs font-bold text-[#00e0a4]">hoodstarent365@gmail.com</p>
          </div>
          <div className="p-8 bg-[#121216] border border-white/5 rounded-[32px] text-center">
            <h3 className="text-[10px] font-black uppercase text-white/30 mb-2 tracking-widest">Web Presence</h3>
            <p className="text-xs font-bold text-[#00e0a4]">hoodstar365.com</p>
          </div>
        </section>
      </div>

      <div className="mt-12 text-center pb-20">
        <p className="text-[10px] font-black uppercase text-white/20 tracking-[0.4em]">© 2024 HSW365 Global Support</p>
      </div>
    </div>
  );
};

export default Support;
