"use client";

import { useState, useEffect } from "react";

export default function PlaylistList() {
  const [playlistData, setPlaylistData] = useState(null);

  useEffect(() => {
    const fetcher = async () => {
      try {
        // code to fetch data from /api/playlists
        const res = await fetch("/api/playlists");
        const data = await res.json();

        if (!res.ok) throw new Error(data.message);

        setPlaylistData(data.data);
      } catch (err) {
        const error = err as Error;
        console.error(error.message);
      }
    };

    fetcher();
  }, []);

  return <p>{JSON.stringify(playlistData)}</p>;
}
