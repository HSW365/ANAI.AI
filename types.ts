
export enum View {
  CHAT = 'CHAT',
  IMAGE = 'IMAGE',
  LIVE = 'LIVE',
  SEARCH = 'SEARCH'
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  image?: string;
  groundingLinks?: { title: string; uri: string }[];
}

export interface GenerationState {
  isGenerating: boolean;
  error: string | null;
}

export interface AIAnalysisResult {
  sentiment: string;
  genreSuggestion: string;
  marketingHook: string;
  aiCritique: string;
}
