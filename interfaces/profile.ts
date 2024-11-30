// Code written by Diya Gandhi
export interface SpotifyImage {
    height: number;
    url: string;
    width: number;
  }
  
  export interface SpotifyFollowers {
    href: string | null;
    total: number;
  }
  
  export interface SpotifyUser {
    country: string;
    display_name: string;
    email: string;
    followers: SpotifyFollowers;
    id: string;
    images: SpotifyImage[];
    product: string;
  }