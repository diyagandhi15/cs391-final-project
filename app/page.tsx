// Code written by Diya Gandhi

"use client"; 
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { SpotifyUser } from '@/interfaces/profile';
import { useRouter } from 'next/navigation';
import SignInButton from '@/components/authentication/SignIn';
import SignOutButton from '@/components/authentication/SignOut';
import StyledButton from '@/components/ui/StyledButton';

const params = new URLSearchParams({
  response_type: 'code',
  client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID as string,
  scope: 'user-read-private user-read-email user-top-read',
  redirect_uri: process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI as string,
  state: '1234'
});


const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export default function HomePage() {
  const [user, setUser] = useState<SpotifyUser | null>(null);
  // const router = useRouter();

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

  const router = useRouter(); 

  return (
    <div>
      {!user ? (
        <SignInButton />
          
      ) : (
        <ButtonContainer>  
          <StyledButton
            onClick={() => router.push('/genre')}  
          >
            Genre Breakdown
          </StyledButton>
          <SignOutButton handleSignOut={handleSignOut} />
        </ButtonContainer>
      )}
    </div>
  );
}