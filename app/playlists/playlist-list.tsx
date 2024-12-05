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
        // Refresh the access token
        const body = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: localStorage.getItem("refresh_token") as string,
            client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID as string,
          }),
        });
        const response = await body.json();

        localStorage.setItem("access_token", response.accessToken);
        if (response.refreshToken) {
          localStorage.setItem("refresh_token", response.refreshToken);
        }

        // fetch user playlist data
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
