"use client";

import { Container, Box } from "@mui/material";
import {
  PageHeading,
  PageLayoutContainer,
} from "@/components/ui/prestyled-components";
import { useParams, useRouter } from "next/navigation";
import TrackList from "./track-list";
import Link from "next/link";

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
              <TrackList />
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
    </>
  );
}
