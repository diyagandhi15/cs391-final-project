/*
Author: Eric Nohara-LeClair
Description: 
The `TrackList` component displays tracks from a specific Spotify playlist in a paginated manner. It uses the playlist ID from the query parameters to fetch track data via an API, with a limit of 20 tracks per page. Tracks are displayed with their cover art, name, duration, and artist information, along with an explicit content marker if applicable. Pagination is achieved using "Back" and "Next" buttons to navigate through pages of tracks. The `CircularProgress` component provides a loading indicator, and the `msToMinutes` utility function converts track durations from milliseconds to a readable "minutes:seconds" format.
*/

import { useState, useEffect } from "react";
import { ISpotifyPlaylistTrack } from "@/interfaces/IPlaylist";
import { useSearchParams } from "next/navigation";
import { Box, CircularProgress, Typography, Button } from "@mui/material";
import { Explicit, NavigateNext, NavigateBefore } from "@mui/icons-material";
import Image from "next/image";
import styled from "styled-components";

const HoverableImage = styled(Image)`
  border-radius: 0.25rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

export default function TrackList() {
  const searchParams = useSearchParams();
  console.log("searchParams:", searchParams?.toString());
  const playlist = searchParams?.get("playlist") as string;
  console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
  console.log("playlist:", playlist);
  console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");

  const [tracks, setTracks] = useState<ISpotifyPlaylistTrack[]>([]);
  const [nextTracks, setNextTracks] = useState<ISpotifyPlaylistTrack[]>([]);
  const [page, setPage] = useState(0);

  const limit = 5;

  if (!playlist) return <p>No playlist provided.</p>;

  useEffect(() => {
    const fetcher = async () => {
      try {
        const res = await fetch(
          `/api/playlisttracks?playlist=${encodeURIComponent(
            playlist
          )}&limit=${limit}&page=${page}`
        );
        const data = await res.json();

        if (!res.ok) throw new Error(data.message);

        setTracks(data.items);

        const resNext = await fetch(
          `/api/playlisttracks?playlist=${encodeURIComponent(
            playlist
          )}&limit=${limit}&page=${page + 1}`
        );
        const dataNext = await resNext.json();

        if (!resNext.ok) throw new Error(data.message);

        setNextTracks(dataNext.items);
      } catch (err) {
        console.error(err);
      }
    };

    fetcher();
  }, [page]);

  const msToMinutes = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;

    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="1rem"
      marginTop="1rem"
      width="100%"
    >
      {tracks.length > 0 ? (
        tracks.map(
          (track: ISpotifyPlaylistTrack, index) =>
            track &&
            track.track && (
              <Box
                key={index}
                display="flex"
                alignItems="center"
                gap="1rem"
                sx={{
                  backgroundColor: "#f0f0f0",
                  padding: "1rem",
                  borderRadius: "0.5rem",
                }}
              >
                <a href={track.track.external_urls?.spotify} target="_blank">
                  <HoverableImage
                    src={
                      track.track.album && track.track.album.images.length > 0
                        ? track.track.album.images[0].url
                        : "/music-note.png"
                    }
                    alt="track cover"
                    width={75}
                    height={75}
                  />
                </a>
                <Box display="flex" flexDirection="column">
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{ fontWeight: "bold", margin: 0 }}
                  >
                    {track.track.name}{" "}
                    {track.track.explicit ? <Explicit /> : null}
                  </Typography>
                  <i>
                    {track.track.artists
                      .map((artist) => artist.name)
                      .join(", ")}
                  </i>
                  {track.track.duration_ms && (
                    <p style={{ margin: 0, marginTop: "0.25rem" }}>
                      {msToMinutes(track.track.duration_ms)}
                    </p>
                  )}
                </Box>
              </Box>
            )
        )
      ) : (
        <Box
          display="flex"
          width="100%"
          justifyContent="center"
          marginTop="2rem"
        >
          <CircularProgress sx={{ color: "#15a146" }} />
        </Box>
      )}
      <Box
        display="flex"
        gap="2rem"
        justifyContent="center"
        alignItems="center"
        marginBottom="1rem"
      >
        {page > 0 && (
          <Button
            variant="contained"
            sx={{ backgroundColor: "#15a146" }}
            onClick={() => setPage(page - 1)}
          >
            <NavigateBefore /> Back
          </Button>
        )}
        Page {page}
        {nextTracks.length > 0 && (
          <Button
            variant="contained"
            sx={{ backgroundColor: "#15a146" }}
            onClick={() => setPage(page + 1)}
          >
            Next <NavigateNext />
          </Button>
        )}
      </Box>
    </Box>
  );
}
