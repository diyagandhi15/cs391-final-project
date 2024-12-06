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
  added_at: string | null;
  track: {
    artists: string[];
    duration_ms: number | null;
    explicit: boolean | null;
    external_urls: { spotify: string } | null;
    name: string | null;
    preview_url: string | null;
  };
}
