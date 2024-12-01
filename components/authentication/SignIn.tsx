// Author: Diya Gandhi
// This component renders a reusable button for initiating the Spotify OAuth process.

import StyledButton from '../ui/StyledButton';

const params = new URLSearchParams({
  response_type: 'code', // Indicates the type of OAuth response expected.
  client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID as string, 
  scope: 'user-read-private user-read-email user-top-read', // Required Spotify API permissions.
  redirect_uri: process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI as string, 
  state: '1234', // Optional state parameter to prevent CSRF attacks.
});

const SignInButton = () => {
  return (
    <StyledButton
      onClick={() =>
        // Redirects the user to Spotify's authentication page with the defined parameters.
        (window.location.href = 'https://accounts.spotify.com/authorize?' + params.toString())
      }
    >
      Sign In with Spotify
    </StyledButton>
  );
};

export default SignInButton;