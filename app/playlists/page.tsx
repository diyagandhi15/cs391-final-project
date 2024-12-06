"use client";

import { Container, Typography, Box } from "@mui/material";
import PlaylistList from "./playlist-list";
import styled from "styled-components";

const PlaylistsHeader = styled.header`
  padding: 20px;
  background-color: #15a146;
  color: white;
  text-align: center;
  font-family: Arial, sans-serif;
`;

export default function PlaylistsPage() {
  return (
    <>
      <Box padding="20px">
        <PlaylistsHeader>
          <h1>User Playlists</h1>
        </PlaylistsHeader>
      </Box>
      <Container maxWidth="sm">
        <Box display="flex" flexDirection="column" alignItems="center">
          <PlaylistList />
        </Box>
      </Container>
    </>
  );
}
