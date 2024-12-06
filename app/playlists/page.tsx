"use client";

import { Container, Typography, Box } from "@mui/material";
import PlaylistList from "./playlist-list";
import {
  PageHeading,
  PageLayoutContainer,
} from "@/components/ui/prestyled-components";

export default function PlaylistsPage() {
  return (
    <>
      <PageLayoutContainer>
        <PageHeading>
          <h1>User Playlists</h1>
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
              <PlaylistList />
            </Box>
          </Container>
        </Container>
      </PageLayoutContainer>
    </>
  );
}
