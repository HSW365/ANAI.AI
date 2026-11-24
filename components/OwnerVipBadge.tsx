import React from 'react';

// "VIP · Owner" pill, shown where the plan/credit level normally shows when the owner is signed in with the owner PIN.
const OwnerVipBadge: React.FC<{ className?: string }> = ({ className = '' }) => (
  <span
    data-testid="owner-vip-badge"
    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-purple-400/40 bg-purple-500/10 text-[9px] font-black uppercase tracking-[0.25em] text-purple-300 ${className}`}
  >
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 8l4.5 4L12 5l4.5 7L21 8l-2 11H5L3 8z" />
    </svg>
    VIP · Owner
  </span>
);

export default OwnerVipBadge;
