// Created By: Yasmine Jibrell


// Interface representing an image object from the Spotify API
interface IImage {
  url: string; // URL of the image
  height: number; // Height of the image in pixels
  width: number; // Width of the image in pixels
}

// Interface representing a Spotify album object
export interface ISpotifyAlbum {
  id: string; // Unique identifier for the album
  name: string; // Name of the album
  release_date: string; // Release date of the album in ISO 8601 format (e.g., YYYY-MM-DD)
  total_tracks: number; // Total number of tracks in the album
  images: IImage[] | null; // Array of image objects for the album or null if unavailable
  external_urls: {
    spotify: string; // URL to the album on Spotify
  };
}

// Interface representing a Spotify artist object
export interface ISpotifyArtist {
  id: string; // Unique identifier for the artist
  name: string; // Name of the artist
  genres: string[]; // List of genres associated with the artist
  popularity: number; // Popularity score of the artist (0-100, higher is more popular)
  external_urls: {
    spotify: string; // URL to the artist's page on Spotify
  };
}

// Interface representing a Spotify track object
export interface ISpotifyTrack {
  id: string; // Unique identifier for the track
  name: string; // Name of the track
  duration_ms: number; // Duration of the track in milliseconds
  explicit: boolean; // Indicates if the track has explicit content
  popularity: number; // Popularity score of the track (0-100, higher is more popular)
  preview_url: string | null; // URL to a 30-second preview of the track, or null if unavailable
  track_number: number; // The position of the track within its album
  album: ISpotifyAlbum; // Album object containing information about the track's album
  artists: ISpotifyArtist[]; // Array of artist objects who contributed to the track
  external_urls: {
    spotify: string; // URL to the track on Spotify
  };
}

// Interface representing a paginated list of Spotify tracks
export interface ISpotifyTracks {
  href: string; // API endpoint for retrieving the current set of tracks
  limit: number; // Maximum number of tracks returned per page
  next: string | null; // URL to the next page of tracks, or null if no more pages
  offset: number; // Index of the first track in the current set
  previous: string | null; // URL to the previous page of tracks, or null if none exists
  total: number; // Total number of tracks available
  items: ISpotifyTrack[]; // Array of track objects representing the current page of tracks
}