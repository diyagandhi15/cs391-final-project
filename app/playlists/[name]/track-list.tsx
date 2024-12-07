import { useState, useEffect } from "react";
import { ISpotifyPlaylistTrack } from "@/interfaces/IPlaylist";

export default function TrackList() {
  const [tracks, setTracks] = useState<ISpotifyPlaylistTrack[]>([]);

  useEffect(() => {
    const fetcher = async () => {
      try {
        const res = await fetch(
          `/api/playlisttracks?playlistUrl=${encodeURIComponent(href)}`
        );
        const data = await res.json();

        if (!res.ok) throw new Error(data.message);

        setTracks(data.items);
      } catch (err) {
        console.error(err);
      }
    };
  });

  return <p>test</p>;
}
