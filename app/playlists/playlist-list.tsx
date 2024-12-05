"use client";

import { useUser } from "@/contexts/UserContext";
import { headers } from "next/headers";
import { useState, useEffect } from "react";

export default function PlaylistList() {
  const { user } = useUser(); // get the current user
  const [playlistData, setPlaylistData] = useState(null);

  useEffect(() => {
    const fetcher = async () => {
      try {
        const res = await fetch("https://api.spotify.com/v1/me/playlists", {
          method: "GET",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        });
        const data = await res.json();

        if (!res.ok) throw new Error(data.message);

        console.log(data);
      } catch (err) {
        const error = err as Error;
        console.error(error.message);
      }
    };

    fetcher();
  }, []);

  return <p>test</p>;
}
