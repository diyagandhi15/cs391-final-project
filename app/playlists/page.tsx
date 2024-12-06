"use client";

import { Container, Typography, Box } from "@mui/material";
import PlaylistList from "./playlist-list";
import styled from "styled-components";
import PageHeading from "@/components/page-heading";

export default function PlaylistsPage() {
  return (
    <>
      <Box padding="20px">
        <PageHeading>
          <h1>User Playlists</h1>
        </PageHeading>
      </Box>
      <Container maxWidth="sm">
        <Box display="flex" flexDirection="column" alignItems="center">
          <PlaylistList />
        </Box>
      </Container>
    </>
  );
}
