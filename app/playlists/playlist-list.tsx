"use client";

import { useState, useEffect } from "react";
import { Box, Typography, CircularProgress, Button } from "@mui/material";
import { ISpotifyPlaylist } from "@/interfaces/IPlaylist";
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
    <Box
      display="flex"
      flexDirection="column"
      width="100%"
      alignItems="center"
      gap="2rem"
    >
      {playlistData ? (
        playlistData.items.map((item, index) =>
          item ? (
            <Box
              display="flex"
              gap="5%"
              key={index}
              width="100%"
              sx={{ backgroundColor: "#f0f0f0" }}
              padding="1rem"
              borderRadius="0.5rem"
            >
              <a href={item.external_urls.spotify} target="_blank">
                {item.images ? (
                  <Image
                    src={item.images[0].url} // error
                    alt="playlist cover"
                    width={150}
                    height={150}
                    style={{
                      borderRadius: "0.25rem",
                      transition: "filter 0.3s ease",
                    }}
                    className="image-hover"
                  />
                ) : (
                  <Image
                    src="/music-note.png"
                    alt="empty playlist cover"
                    width={150}
                    height={150}
                    style={{
                      borderRadius: "0.25rem",
                      transition: "filter 0.3s ease",
                    }}
                    className="image-hover"
                  />
                )}
              </a>
              <Box display="flex" flexDirection="column" width="100%">
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{ fontWeight: "bold" }}
                >
                  {item.name} -{" "}
                  <i style={{ fontWeight: "normal" }}>
                    {item.tracks.total} Tracks
                  </i>
                </Typography>
                {item.description && (
                  <i style={{ color: "#545454" }}>{item.description}</i>
                )}
                <ul>
                  <li>
                    {item.collaborative ? "collaborative" : "non collaborative"}{" "}
                    playlist
                  </li>
                  <li>{item.public ? "public" : "private"} playlist</li>
                </ul>
                <Button
                  sx={{
                    backgroundColor: "#15a146",
                    color: "white",
                    width: "100%",
                  }}
                >
                  View Tracks
                </Button>
              </Box>
            </Box>
          ) : null
        )
      ) : (
        <CircularProgress sx={{ color: "#15a146" }} />
      )}
    </Box>
  );
}
