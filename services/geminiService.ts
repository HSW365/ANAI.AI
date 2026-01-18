
import { GoogleGenAI, Type, Modality } from "@google/genai";

// Always create a fresh instance to ensure it uses the latest process.env.API_KEY
// injected from the window.aistudio.openSelectKey() dialog.
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

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
  const ai = getAI();
  const systemInstruction = `Act as a world-class AI Music Producer. Create a complete song blueprint. 
  - All melodies, chord progressions, and lyrics MUST be 100% original.
  - Target Duration: ${songLength}.
  - Number of Variations: ${numVariations}.
  - Language: ${language}.
  - Style: ${artistStyle}.`;

  const userPrompt = `Create a full song blueprint based on this concept: "${prompt}".`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: userPrompt,
    config: {
      systemInstruction,
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          artist: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              bio: { type: Type.STRING },
              voiceProfile: { type: Type.STRING }
            },
            required: ['name', 'bio', 'voiceProfile']
          },
          lyrics: {
            type: Type.OBJECT,
            properties: {
              hook: { type: Type.STRING },
              verse1: { type: Type.STRING },
              verse2: { type: Type.STRING },
              bridge: { type: Type.STRING }
            },
            required: ['hook', 'verse1', 'verse2', 'bridge']
          },
          production: {
            type: Type.OBJECT,
            properties: {
              bpm: { type: Type.STRING },
              key: { type: Type.STRING },
              songLength: { type: Type.STRING },
              beatVariations: { type: Type.ARRAY, items: { type: Type.STRING } },
              arrangement: { type: Type.STRING },
              sonicDNA: { type: Type.STRING }
            },
            required: ['bpm', 'key', 'songLength', 'beatVariations', 'arrangement', 'sonicDNA']
          },
          strategy: { type: Type.STRING }
        },
        required: ['artist', 'lyrics', 'production', 'strategy']
      }
    }
  });

  return JSON.parse(response.text || '{}');
};

export const generateVoicePreview = async (text: string, voiceName: 'Kore' | 'Puck' | 'Charon' | 'Fenrir' | 'Zephyr' = 'Kore'): Promise<string | null> => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `Say this: ${text}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName },
          },
        },
      },
    });
    return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data || null;
  } catch (e) {
    return null;
  }
};

export const generatePromoArt = async (prompt: string): Promise<string | null> => {
  const ai = getAI();
  // Upgrading to gemini-3-pro-image-preview for Store-Ready quality.
  // Note: This model REQUIRES user key selection via window.aistudio.openSelectKey()
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-image-preview',
    contents: {
      parts: [{ text: `Minimalist brand aesthetic, cinematic lighting, 4K resolution: ${prompt}` }]
    },
    config: {
      imageConfig: { aspectRatio: '1:1', imageSize: '1K' }
    }
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
};

export const generateTokenBlueprint = async (concept: string, chain: 'solana' | 'base' | 'ethereum') => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Create a professional Digital Asset Blueprint for: ${concept} on ${chain}.`,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          symbol: { type: Type.STRING },
          lore: { type: Type.STRING },
          distribution: { 
            type: Type.ARRAY, 
            items: { 
              type: Type.OBJECT,
              properties: {
                label: { type: Type.STRING },
                percentage: { type: Type.STRING }
              }
            } 
          },
          taxes: { type: Type.STRING },
          utility: { type: Type.STRING },
          hook: { type: Type.STRING }
        },
        required: ['name', 'symbol', 'lore', 'distribution', 'taxes', 'utility', 'hook']
      }
    }
  });

  return JSON.parse(response.text || '{}');
};

export const generateVentureThesis = async (projectName: string, vision: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Create a professional Growth Thesis for: ${projectName}. Vision: ${vision}.`,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          opportunity: { type: Type.STRING },
          theMoat: { type: Type.STRING },
          roadmap: { type: Type.ARRAY, items: { type: Type.STRING } },
          impact: { type: Type.STRING },
          investmentAsk: { type: Type.STRING }
        },
        required: ['opportunity', 'theMoat', 'roadmap', 'impact', 'investmentAsk']
      }
    }
  });

  return JSON.parse(response.text || '{}');
};

export const generateStoreSetup = async (productName: string, productType: string, niche: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Create an ecommerce blueprint for ${productName} (${productType}) in ${niche}.`,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          salesCopy: {
            type: Type.OBJECT,
            properties: {
              headline: { type: Type.STRING },
              subheadline: { type: Type.STRING },
              benefits: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ['headline', 'subheadline', 'benefits']
          },
          pricing: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                tier: { type: Type.STRING },
                price: { type: Type.STRING },
                features: { type: Type.ARRAY, items: { type: Type.STRING } }
              }
            }
          },
          upsellIdea: { type: Type.STRING },
          persona: { type: Type.STRING }
        },
        required: ['salesCopy', 'pricing', 'upsellIdea', 'persona']
      }
    }
  });

  return JSON.parse(response.text || '{}');
};

export const generateWebsiteBlueprint = async (brandName: string, niche: string, assets?: BrandAssets, logoData?: { data: string, mimeType: string }) => {
  const ai = getAI();
  const promptText = `Generate a website blueprint for ${brandName} in ${niche}. Colors: ${assets?.primaryColor}.`;
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: promptText,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          domains: { type: Type.ARRAY, items: { type: Type.STRING } },
          sitemap: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { page: { type: Type.STRING }, goal: { type: Type.STRING } } } },
          visuals: { type: Type.OBJECT, properties: { palette: { type: Type.ARRAY, items: { type: Type.STRING } }, typography: { type: Type.STRING }, designTokens: { type: Type.STRING } } },
          seo: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ['domains', 'sitemap', 'visuals', 'seo']
      }
    }
  });

  return JSON.parse(response.text || '{}');
};

export const generateAppBlueprint = async (idea: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Create a technical app blueprint for: "${idea}".`,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          appName: { type: Type.STRING },
          stack: { type: Type.OBJECT, properties: { frontend: { type: Type.STRING }, backend: { type: Type.STRING }, database: { type: Type.STRING } }, required: ['frontend', 'backend', 'database'] },
          features: { type: Type.ARRAY, items: { type: Type.STRING } },
          screens: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, description: { type: Type.STRING } } } },
          compliance: { type: Type.STRING }
        },
        required: ['appName', 'stack', 'features', 'screens', 'compliance']
      }
    }
  });

  return JSON.parse(response.text || '{}');
};

export const generateDigitalProduct = async (idea: string, type: 'ebook' | 'course' | 'business_plan') => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Create a detailed ${type} for idea: "${idea}".`,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          outline: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { chapter: { type: Type.STRING }, summary: { type: Type.STRING } } } },
          strategy: { type: Type.STRING }
        },
        required: ['title', 'outline', 'strategy']
      }
    }
  });

  return JSON.parse(response.text || '{}');
};

export const generateMarketingKit = async (productName: string, targetAudience: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate marketing kit for "${productName}" targeting "${targetAudience}".`,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          headlines: { type: Type.ARRAY, items: { type: Type.STRING } },
          emailHook: { type: Type.STRING },
          socialCaptions: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ['headlines', 'emailHook', 'socialCaptions']
      }
    }
  });
  return JSON.parse(response.text || '{}');
};

export const analyzeTrackConcept = async (artist: string, title: string, description: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze track: ${title} by ${artist}. Description: ${description}.`,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          sentiment: { type: Type.STRING },
          genreSuggestion: { type: Type.STRING },
          marketingHook: { type: Type.STRING },
          aiCritique: { type: Type.STRING }
        },
        required: ['sentiment', 'genreSuggestion', 'marketingHook', 'aiCritique']
      }
    }
  });

  return JSON.parse(response.text || '{}');
};
