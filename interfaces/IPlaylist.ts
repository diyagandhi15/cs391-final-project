/*
Author: Eric Nohara-LeClair
Description: 
This file defines TypeScript interfaces to structure Spotify playlist data used within the application. 

1. **IImage**: Represents image metadata, including the URL, height, and width. This is used for playlist cover art or track cover art.

2. **ISpotifyPlaylistItem**: Represents an individual playlist item. It includes details such as whether the playlist is collaborative or public, its description, external Spotify URL, total tracks, associated images, and a unique ID.

3. **ISpotifyPlaylist**: Represents a collection of playlists with metadata about the API response, including pagination details like `limit`, `next`, `offset`, and `total`. It contains an array of `ISpotifyPlaylistItem`.

4. **ISpotifyPlaylistTrack**: Represents a track in a Spotify playlist, including artist names, duration in milliseconds, explicit content flag, external Spotify URL, name, and ID.

These interfaces provide a strongly typed structure for working with Spotify's playlist and track data in a TypeScript environment.
*/

interface IImage {
  url: string;
  height: number;
  width: number;
}

export interface ISpotifyPlaylistItem {
  collaborative: boolean | null;
  description: string | null;
  external_urls: { spotify: string }; // url to the playlist
  name: string | null;
  public: boolean | null;
  tracks: { href: string; total: number };
  images: IImage[] | null;
  id: string;
}

export interface ISpotifyPlaylist {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number; // total number of playlists
  items: ISpotifyPlaylistItem[];
}

export interface ISpotifyPlaylistTrack {
  track: {
    artists: { name: string }[];
    duration_ms: number | null;
    explicit: boolean | null;
    external_urls: { spotify: string } | null;
    name: string | null;
    id: string;
  };
}
