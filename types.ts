export interface Artist {
  id: string;
  name: string;
  genre: string;
  description: string;
  famousSong: string;
  imageUrl: string;
  yearActive: string;
}

export interface Recommendation {
  artistName: string;
  reason: string;
  suggestedTrack: string;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}