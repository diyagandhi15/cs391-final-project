// Created By: Yasmine Jibrell


interface IImage {
    url: string;
    height: number;
    width: number;
}


export interface ISpotifyAlbum {
    id: string;
    name: string;
    release_date: string;
    total_tracks: number;
    images: IImage[] | null;
    external_urls: {
      spotify: string;
    };
}
  

export interface ISpotifyArtist {
    id: string;
    name: string;
    genres: string[];
    popularity: number;
    external_urls: {
      spotify: string;
    };
}


export interface ISpotifyTrack {
    id: string;
    name: string;
    duration_ms: number;
    explicit: boolean;
    popularity: number;
    preview_url: string | null;
    track_number: number;
    album: ISpotifyAlbum;
    artists: ISpotifyArtist[];
    external_urls: {
      spotify: string;
    };
}


export interface ISpotifyTracks {
    href: string;
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
    items: ISpotifyTrack[];
}
  