// Code written by Diya Gandhi

"use client"; 
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { SpotifyUser } from '@/interfaces/profile';
import { useRouter } from 'next/navigation';

const params = new URLSearchParams({
  response_type: 'code',
  client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID as string,
  scope: 'user-read-private user-read-email user-top-read',
  redirect_uri: process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI as string,
  state: '1234'
});

const StyledButton = styled.button`
  background-color: #4CAF50; 
  color: white; 
  padding: 10px 20px; 
  border: none; 
  border-radius: 5px; 
  font-size: 20px; 

  &:hover {
    background-color: #45a049; 
  }
`
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export default function HomePage() {
  const [user, setUser] = useState<SpotifyUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchData();
  },[]);

  const handleSignOut = () => {
    document.cookie = 'token=; Max-Age=0; Path=/'; 
    setUser(null); 
  };

  const fetchData = () => {
      fetch('/api/user', { credentials: 'include' })
          .then((response) => {
            if (response.ok) {
              return response.json()
            } else {
              throw new Error('Error Fetching User:' + response.statusText)
            }
          })
          .then((json) => {
            setUser(json)
          })
          .catch((error) => console.log(error));
  }

  return (
    <div>
      {!user ? (
        <div>
          <StyledButton
            onClick={() => window.location.href = 'https://accounts.spotify.com/authorize?' + params.toString()}
          >
          Sign In with Spotify
          </StyledButton>
        </div>
      ) : (
        <ButtonContainer>  
          <StyledButton
            onClick={() => router.push('/genre')} 
          >
            Genre Breakdown
          </StyledButton>
          <StyledButton
            onClick={handleSignOut}
          >
            Sign Out
          </StyledButton>
        </ButtonContainer>
      )}
    </div>
  );
}