
import React, { useState, useEffect } from 'react';
import { notificationService, AppNotification } from '../services/notificationService';

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [subStatus, setSubStatus] = useState<string | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<NotificationPermission>(
    (window.Notification?.permission || 'default') as NotificationPermission
  );

  useEffect(() => {
    return notificationService.subscribe(setNotifications);
  }, []);

  const handleRequestPermission = async () => {
    const success = await notificationService.requestPermission();
    setPermissionStatus(window.Notification?.permission);
  };

  const handleNewsletter = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setSubStatus("JOINING...");
    const email = new FormData(e.currentTarget).get('email');
    
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (data.ok) {
        setSubStatus("WELCOME TO THE INNER CIRCLE.");
        (e.target as HTMLFormElement).reset();
      } else {
        setSubStatus("PROTOCOL FAULT. RETRY.");
      }
    } catch (e) {
      setSubStatus("OFFLINE.");
    } finally {
      setSubmitting(false);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'submission': return '🎵';
      case 'podcast': return '🎙️';
      case 'promo': return '🔥';
      default: return '📢';
    }
  };

  return (
    <div className="px-6 py-12 max-w-3xl mx-auto min-h-screen">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter leading-none">INBOX</h1>
          <p className="text-[#a0a0a7] text-[10px] uppercase font-black tracking-[0.3em] mt-2 italic text-[#00e0a4]">Updates & Alerts</p>
        </div>
        {permissionStatus !== 'granted' && (
          <button 
            onClick={handleRequestPermission}
            className="text-[9px] font-black bg-[#00e0a4]/10 text-[#00e0a4] px-6 py-2 rounded-full border border-[#00e0a4]/20 hover:bg-[#00e0a4] hover:text-black transition-all uppercase tracking-widest shadow-lg shadow-[#00e0a4]/5"
          >
            ENABLE PUSH
          </button>
        )}
      </div>

      <div className="space-y-4 mb-12">
        {notifications.length === 0 ? (
          <div className="text-center py-20 bg-[#121216] border border-white/5 rounded-[32px] border-dashed">
            <p className="text-white/20 font-black uppercase tracking-widest text-[10px]">Neural Inbox Silent.</p>
          </div>
        ) : (
          notifications.map((n) => (
            <div 
              key={n.id}
              onClick={() => notificationService.markAsRead(n.id)}
              className={`relative p-8 rounded-[32px] border transition-all cursor-pointer group shadow-xl ${
                n.read ? 'bg-[#0b0b0c] border-white/5 opacity-40' : 'bg-[#121216] border-[#00e0a4]/20'
              }`}
            >
              {!n.read && (
                <div className="absolute top-6 right-6 w-2 h-2 bg-[#00e0a4] rounded-full animate-pulse" />
              )}
              <div className="flex gap-6">
                <span className="text-3xl grayscale group-hover:grayscale-0 transition-all duration-500">{getIcon(n.type)}</span>
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-black text-white group-hover:text-[#00e0a4] transition-colors uppercase tracking-tight text-lg">{n.title}</h3>
                    <span className="text-[9px] text-white/20 font-black uppercase tracking-widest">
                      {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-sm text-white/40 font-medium leading-relaxed uppercase tracking-tight">{n.body}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="grid gap-6">
        <section className="p-10 bg-[#121216] rounded-[40px] border border-white/5 shadow-2xl">
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00e0a4] mb-6">Neural Broadcast System</h4>
          <form onSubmit={handleNewsletter} className="space-y-4">
             <div className="flex gap-3">
               <input name="email" required type="email" placeholder="ENTER EMAIL FOR DROPS" className="flex-grow bg-[#0b0b0c] border border-white/5 p-4 rounded-xl focus:border-[#00e0a4] outline-none text-xs font-black uppercase tracking-widest" />
               <button disabled={submitting} className="bg-white text-black px-8 py-4 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-[#00e0a4] transition-all">JOIN</button>
             </div>
             {subStatus && <p className="text-[8px] font-black text-[#00e0a4] uppercase tracking-widest text-center italic">{subStatus}</p>}
          </form>
        </section>

        <section className="p-10 glass rounded-[40px] border border-white/5">
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-8">Neural Notification Layers</h4>
          <div className="space-y-6">
            {[
              { label: 'Track Submissions', desc: 'Status updates on your music metadata' },
              { label: 'Podcast Releases', desc: 'Alerts for new Respect Da Game episodes' },
              { label: 'Exclusive Merch', desc: 'Early access to limited HSW365 drops' }
            ].map((item, idx) => (
              <div key={idx} className="flex justify-between items-center pb-6 border-b border-white/5 last:border-0 last:pb-0">
                <div>
                  <p className="text-sm font-black text-white uppercase tracking-tight">{item.label}</p>
                  <p className="text-[9px] text-white/20 uppercase font-black tracking-widest mt-1">{item.desc}</p>
                </div>
                <div className="w-12 h-6 bg-[#00e0a4]/10 rounded-full p-1 relative cursor-pointer border border-[#00e0a4]/20">
                  <div className="w-4 h-4 bg-[#00e0a4] rounded-full shadow-lg ml-auto" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      
      <div className="mt-12 text-center pb-20 opacity-10">
        <p className="text-[8px] font-black uppercase tracking-[0.5em]">HSW365 System Inbox v4.2</p>
      </div>
    </div>
  );
};

export default Notifications;
