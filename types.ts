
export interface ARLens {
  id: string;
  name: string;
  category: 'Face' | 'World' | 'Object' | 'Portal';
  previewUrl: string;
  description: string;
  stats: {
    views: number;
    shares: number;
  };
  createdAt: string;
}

export interface UserAccount {
  username: string;
  email: string;
  bio: string;
  avatar: string;
  lensCount: number;
  reach: string;
}

export enum AppState {
  DASHBOARD = 'DASHBOARD',
  STUDIO = 'STUDIO',
  ACCOUNT = 'ACCOUNT',
  PREVIEW = 'PREVIEW'
}
