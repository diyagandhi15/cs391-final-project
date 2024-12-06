"use client";

import { useState, useEffect } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { ISpotifyPlaylist, ISpotifyPlaylistItem } from "@/interfaces/IPlaylist";
import Image from "next/image";

export default function PlaylistList() {
  const [playlistData, setPlaylistData] = useState<ISpotifyPlaylist | null>(
    null
  );

  useEffect(() => {
    const fetcher = async () => {
      try {
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

  return (
    <Box display="flex" flexDirection="column" marginTop="2rem">
      {playlistData ? (
        playlistData.items.map((item, index) => (
          <Box key={index}>
            <a href={item?.external_urls.spotify} target="_blank">
              {item?.images ? (
                <Image
                  src={item.images[0].url} // error
                  alt="playlist cover"
                  width={150}
                  height={150}
                />
              ) : (
                <Image
                  src="/music-note.png"
                  alt="empty playlist cover"
                  width={150}
                  height={150}
                />
              )}
            </a>
          </Box>
        ))
      ) : (
        <CircularProgress sx={{ color: "#15a146" }} />
      )}
    </Box>
  );
}
