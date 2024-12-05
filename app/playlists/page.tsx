import { Container, Typography, Box } from "@mui/material";
import PlaylistList from "./playlist-list";

export default function PlaylistsPage() {
  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        marginTop="3rem"
      >
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          className="text-center"
        >
          User Playlists
        </Typography>
        <PlaylistList />
      </Box>
    </Container>
  );
}
