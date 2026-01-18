
import React, { useState } from 'react';

const Settings: React.FC = () => {
  const [deleting, setDeleting] = useState(false);

  const handleDeleteRequest = () => {
    if (confirm("DANGER: This will request the permanent deletion of your neural blueprints, transaction history, and contact data. This action cannot be undone. Proceed?")) {
      setDeleting(true);
      // Simulate deletion request to backend
      setTimeout(() => {
        alert("Deletion Request Received. Your account and data will be scrubbed from the Hoodstar365/ANAI servers within 72 hours per GDPR/Apple compliance.");
        setDeleting(false);
      }, 2000);
    }
  };

  return (
    <div className="px-6 py-12 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-8">System <span className="text-[#00e0a4]">Settings</span></h1>
      
      <div className="space-y-8">
        <section className="bg-[#121216] border border-white/5 p-8 rounded-[32px]">
          <h2 className="text-xs font-black uppercase text-white/40 mb-6 tracking-widest">Account & Security</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-4 border-b border-white/5">
              <div>
                <p className="text-sm font-bold text-white">Neural Sync Status</p>
                <p className="text-[10px] text-white/40 uppercase font-black">Encrypted via AES-256</p>
              </div>
              <span className="text-[#00e0a4] text-xs font-black uppercase tracking-widest italic">Active</span>
            </div>
            <div className="flex justify-between items-center py-4">
              <div>
                <p className="text-sm font-bold text-white">Cloud Backup</p>
                <p className="text-[10px] text-white/40 uppercase font-black">HSW365 Distributed Storage</p>
              </div>
              <div className="w-10 h-5 bg-[#00e0a4] rounded-full p-1 flex justify-end">
                <div className="w-3 h-3 bg-white rounded-full" />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#121216] border border-white/5 p-8 rounded-[32px]">
          <h2 className="text-xs font-black uppercase text-red-500/50 mb-6 tracking-widest">Danger Zone (Mandatory Compliance)</h2>
          <div className="p-6 bg-red-500/5 border border-red-500/10 rounded-2xl mb-6">
            <p className="text-xs text-red-500/70 leading-relaxed font-bold uppercase tracking-tight">
              Apple requires that all users have the right to delete their account and associated data. Requesting deletion will remove your email from our distribution lists and clear your credit history.
            </p>
          </div>
          <button 
            onClick={handleDeleteRequest}
            disabled={deleting}
            className="w-full bg-red-500/10 text-red-500 border border-red-500/20 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all disabled:opacity-50"
          >
            {deleting ? 'PROCESSING REQUEST...' : 'DELETE ACCOUNT & DATA'}
          </button>
        </section>
      </div>

      <div className="mt-12 text-center pb-20">
        <p className="text-[10px] font-black uppercase text-white/20 tracking-[0.4em]">Hardware ID: ANAI-SHIELD-V1</p>
      </div>
    </div>
  );
};

export default Settings;
