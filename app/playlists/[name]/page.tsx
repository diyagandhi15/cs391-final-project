/*
Author: Eric Nohara-LeClair
Description: 
The `PlaylistsPage` component displays a list of tracks from a specific Spotify playlist. It retrieves the playlist name from the URL parameters, decodes it, and uses it as the heading for the page. The component includes the `TrackList` component to render the tracks and a "Return" link for navigation back to the playlist list. Material-UI is used for styling the layout, and custom pre-styled components, `PageHeading` and `PageLayoutContainer`, provide consistent page styling. This page ensures a smooth user experience by redirecting back to the playlist list if no valid name is provided.
*/

"use client";

import { Container, Box } from "@mui/material";
import {
  PageHeading,
  PageLayoutContainer,
} from "@/components/ui/prestyled-components";
import { useParams } from "next/navigation";
import TrackList from "./track-list";
import Link from "next/link";

export default function PlaylistsPage() {
  const params = useParams();
  const encodedName = params?.name as string;
  const name = decodeURIComponent(encodedName);

  return (
    <PageLayoutContainer>
      <PageHeading>
        <h1>Tracks From {name}</h1>
      </PageHeading>
      <Container
        sx={{
          width: "100%",
          backgroundColor: "white",
          borderRadius: "0.5rem",
          minHeight: "60vh",
        }}
      >
        <Container maxWidth="sm">
          <Box display="flex" flexDirection="column" alignItems="center">
            {name ? (
              <TrackList />
            ) : (
              <p>No tracks found. Check for invalid or missing playlist id.</p>
            )}
            <Link
              href="/playlists"
              style={{
                textDecoration: "none",
                marginBottom: "1rem",
              }}
            >
              Return
            </Link>
          </Box>
        </Container>
      </Container>
    </PageLayoutContainer>
  );
}
