// This file used to call @google/genai directly from the browser, which meant
// the Gemini API key shipped inside the compiled mobile app bundle. All calls
// now go through the server proxy at API_BASE (see /server) - the key never
// leaves the backend. Every exported function keeps its original name and
// signature so no caller needs to change.

const API_BASE = import.meta.env.VITE_API_BASE || 'https://api.anaiai.co';
const APP_SHARED_SECRET = import.meta.env.VITE_APP_SHARED_SECRET as string | undefined;

async function post<T = any>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}/api/gemini${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(APP_SHARED_SECRET ? { 'x-app-secret': APP_SHARED_SECRET } : {}),
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`Gemini proxy error (${res.status}) on ${path}`);
  }
  return res.json();
}

export interface BrandAssets {
  logoDescription?: string;
  primaryColor?: string;
  secondaryColor?: string;
  typography?: string;
}

export const generateMusicBlueprint = async (
  prompt: string,
  artistStyle: string,
  customReference: string,
  language: string,
  songLength: string,
  numVariations: number
) => {
  return post('/music-blueprint', { prompt, artistStyle, customReference, language, songLength, numVariations });
};

export const generateVoicePreview = async (
  text: string,
  voiceName: 'Kore' | 'Puck' | 'Charon' | 'Fenrir' | 'Zephyr' = 'Kore'
): Promise<string | null> => {
  try {
    const { audio } = await post<{ audio: string | null }>('/voice-preview', { text, voiceName });
    return audio;
  } catch {
    return null;
  }
};

export const generatePromoArt = async (prompt: string): Promise<string | null> => {
  const { image } = await post<{ image: string | null }>('/promo-art', { prompt });
  return image;
};

export const generateTokenBlueprint = async (concept: string, chain: 'solana' | 'base' | 'ethereum') => {
  return post('/token-blueprint', { concept, chain });
};

export const generateVentureThesis = async (projectName: string, vision: string) => {
  return post('/venture-thesis', { projectName, vision });
};

export const generateStoreSetup = async (productName: string, productType: string, niche: string) => {
  return post('/store-setup', { productName, productType, niche });
};

export const generateWebsiteBlueprint = async (
  brandName: string,
  niche: string,
  assets?: BrandAssets,
  logoData?: { data: string; mimeType: string }
) => {
  return post('/website-blueprint', { brandName, niche, assets, logoData });
};

export const generateAppBlueprint = async (idea: string) => {
  return post('/app-blueprint', { idea });
};

export const generateDigitalProduct = async (idea: string, type: 'ebook' | 'course' | 'business_plan') => {
  return post('/digital-product', { idea, type });
};

export const generateMarketingKit = async (productName: string, targetAudience: string) => {
  return post('/marketing-kit', { productName, targetAudience });
};

export const analyzeTrackConcept = async (artist: string, title: string, description: string) => {
  return post('/track-concept', { artist, title, description });
};
