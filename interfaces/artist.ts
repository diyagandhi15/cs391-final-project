import { SpotifyFollowers, SpotifyImage } from "./profile";

// SpotifyArtist interface by: Tsz Kit Wong
export interface SpotifyArtist {
    id: string;
    name: string;
    genres: string[];
    images: SpotifyImage[];
    followers: SpotifyFollowers;
    popularity: number;
    external_urls: {
      spotify: string;
    };
}