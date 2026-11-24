// HSW365 owner access (client side). owner-login.js (loaded from index.html) handles the PIN
// sign-in and exposes window.HSW_OWNER / HSW_OWNER_TOKEN. This module turns that into React state
// and adds the owner token to API calls so the server can verify it with the owner-pin service.
import { useEffect, useState } from "react";

declare global {
  interface Window {
    HSW_OWNER?: boolean;
    HSW_OWNER_TOKEN?: string | null;
    HSW_VIP?: { owner: boolean; tier: string; unlimited: boolean } | null;
    HSW_OWNER_READY?: Promise<boolean>;
    HSW_OWNER_OPEN?: () => void;
    hswOwner?: {
      open: () => void;
      signOut: () => void;
      isOwner: () => boolean;
      token: () => string | null;
      ready: Promise<boolean>;
      onChange: (fn: (on: boolean, detail: { owner: boolean; token: string | null }) => void) => void;
    };
  }
}

export function isOwner(): boolean {
  return typeof window !== "undefined" && window.HSW_OWNER === true;
}

export function ownerHeaders(): Record<string, string> {
  const token = typeof window !== "undefined" && window.HSW_OWNER ? window.HSW_OWNER_TOKEN : null;
  return token ? { "X-HSW-Owner": token } : {};
}

export function openOwnerLogin(): void {
  if (typeof window === "undefined") return;
  if (window.hswOwner) window.hswOwner.open();
  else if (window.HSW_OWNER_OPEN) window.HSW_OWNER_OPEN();
}

// Calls fn whenever owner mode changes (PIN sign-in, sign-out, saved session restored on load).
export function onOwnerChange(fn: (owner: boolean) => void): () => void {
  if (typeof window === "undefined") return () => {};
  let live = true;
  const handler = () => { if (live) fn(isOwner()); };
  window.addEventListener("hsw-owner", handler);
  if (window.HSW_OWNER_READY) window.HSW_OWNER_READY.then(handler, handler);
  else window.addEventListener("load", handler, { once: true });
  return () => { live = false; window.removeEventListener("hsw-owner", handler); window.removeEventListener("load", handler); };
}

export function useOwner(): boolean {
  const [owner, setOwner] = useState<boolean>(isOwner);
  useEffect(() => {
    setOwner(isOwner());
    return onOwnerChange(setOwner);
  }, []);
  return owner;
}
