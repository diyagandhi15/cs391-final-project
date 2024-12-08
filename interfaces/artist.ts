// By: Tsz Kit Wong
// This details the interface for a Spotify artist object, which includes:
// the artist's name, genres, popularity, images, followers, and external URLs.

import { SpotifyFollowers, SpotifyImage } from "./profile";

export interface SpotifyArtist {
    id: string;
    name: string;
    genres: string[];
    popularity: number;
    images: SpotifyImage[];
    followers: SpotifyFollowers;
    // total_listen_time: number;
    external_urls: {
      spotify: string;
    };
}