import { useState, useEffect } from "react";
import { ISpotifyPlaylistTrack } from "@/interfaces/IPlaylist";
import { useSearchParams, useRouter } from "next/navigation";
import { Box, CircularProgress, Typography, Button } from "@mui/material";
import TrackCover from "./track-cover";

export default function TrackList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const playlist = searchParams?.get("playlist") as string;

  if (!playlist) router.push("/playlists"); // if no playlist is provided, just redirect back to the playlists route

  const [tracks, setTracks] = useState<ISpotifyPlaylistTrack[]>([]);

  useEffect(() => {
    const fetcher = async () => {
      try {
        const res = await fetch(
          `/api/playlisttracks?playlist=${encodeURIComponent(playlist)}`
        );
        const data = await res.json();

        if (!res.ok) throw new Error(data.message);

        console.log(data.items);

        setTracks(data.items);
      } catch (err) {
        console.error(err);
      }
    };

    fetcher();
  }, []);

  return (
    <>
      {tracks.length > 0 ? (
        tracks.map(
          (track: ISpotifyPlaylistTrack, index) =>
            track &&
            track.track && (
              <Box key={index}>
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{ fontWeight: "bold" }}
                >
                  {track.track.name}
                </Typography>
                <TrackCover trackID={track.track.id} />
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
    </>
  );
}
