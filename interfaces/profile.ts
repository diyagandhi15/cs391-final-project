// Author: Diya Gandhi
// This file defines TypeScript interfaces for the structure of a Spotify user and related data.
// It includes SpotifyUser (user details), SpotifyFollowers (follower count and link), and SpotifyImage (image data for user profile).

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
  external_urls: { spotify: string } | null;
}

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
