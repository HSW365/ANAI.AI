
export enum AppSection {
  HOME = 'home',
  SUBMIT = 'submit',
  MERCH = 'merch',
  AI_LAB = 'ai_lab',
  PODCAST = 'podcast',
  BOOKING = 'booking'
}

export interface TrackSubmission {
  artist: string;
  title: string;
  email: string;
  file: File | null;
}

export interface BookingRequest {
  org: string;
  email: string;
  date: string;
  notes: string;
}

export interface AIAnalysisResult {
  sentiment: string;
  genreSuggestion: string;
  marketingHook: string;
  aiCritique: string;
}
