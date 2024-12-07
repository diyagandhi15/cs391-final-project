"use client";

import { Container, Box } from "@mui/material";
import {
  PageHeading,
  PageLayoutContainer,
} from "@/components/ui/prestyled-components";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import TrackList from "./track-list";

export default function PlaylistsPage() {
  const router = useRouter();
  const params = useParams();
  const encodedName = params?.name as string;
  const name = decodeURIComponent(encodedName);

  if (!name) router.push("/playlists");

  return (
    <>
      <PageLayoutContainer>
        <PageHeading>
          <h1>{name} Tracks</h1>
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
              <TrackList />
            </Box>
          </Container>
        </Container>
      </PageLayoutContainer>
    </>
  );
}
