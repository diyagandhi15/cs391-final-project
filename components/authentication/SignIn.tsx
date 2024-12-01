// Code written by Diya Gandhi
import StyledButton from '../ui/StyledButton';

const params = new URLSearchParams({
  response_type: 'code',
  client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID as string,
  scope: 'user-read-private user-read-email user-top-read',
  redirect_uri: process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI as string,
  state: '1234',
});

const SignInButton = () => {
  return (
    <StyledButton
      onClick={() => window.location.href = 'https://accounts.spotify.com/authorize?' + params.toString()}
    >
      Sign In with Spotify
    </StyledButton>
  );
};

export default SignInButton;