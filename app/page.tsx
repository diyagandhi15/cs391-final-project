/*
Author: Eric Nohara-LeClair
Description: This component is the home page of the application. If there is no user signed in, it will have a button to sign a user in. If a user is signed in, it just serves as a home page where the user can navigate to the different pages via the navigation menu.
*/

"use client";

import Image from "next/image";
import { Box, Typography } from "@mui/material";
import { useUser } from "@/contexts/UserContext";
import SignInButton from "@/components/authentication/sign-in-button";
import styled from "styled-components";

const SpotifyLogoLink = styled(Image)`
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

export default function Home() {
  const { user } = useUser();

  console.log(user);

  return (
    <Box
      width="100%"
      display="flex"
      alignItems="center"
      marginTop="3rem"
      flexDirection="column"
      gap="1rem"
    >
      {user ? (
        <Typography variant="h3" component="h2" gutterBottom>
          {user.display_name ? user.display_name : "User"}&apos;s Spotify
          Insights
        </Typography>
      ) : (
        <Typography variant="h3" component="h2" gutterBottom>
          Spotify Insights
        </Typography>
      )}
      {user && user.external_urls ? (
        <a href={user.external_urls.spotify} target="_blank">
          <SpotifyLogoLink
            src="/spotify-mobile-apps-icon-free-png.webp"
            alt="spotify logo"
            width="300"
            height="300"
          />
        </a>
      ) : (
        <Image
          src="/spotify-mobile-apps-icon-free-png.webp"
          alt="spotify logo"
          width="300"
          height="300"
        />
      )}
      {!user && <SignInButton />}
    </Box>
  );
}
