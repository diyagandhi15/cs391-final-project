// Author: Diya Gandhi
// This component renders a reusable button for initiating the Spotify OAuth process.

import StyledButton from "../ui/StyledButton";
import { Button } from "@mui/material";

const params = new URLSearchParams({
  response_type: "code", // Indicates the type of OAuth response expected.
  client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID as string,
  scope: "user-read-private user-read-email user-top-read", // Required Spotify API permissions.
  redirect_uri: process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI as string,
  state: "1234", // Optional state parameter to prevent CSRF attacks.
});

export default function SignInButton() {
  return (
    <Button
      sx={{ backgroundColor: "#15a146", color: "white" }}
      onClick={() =>
        (window.location.href =
          "https://accounts.spotify.com/authorize?" + params.toString())
      }
    >
      Sign in with Spotify
    </Button>
  );
}
