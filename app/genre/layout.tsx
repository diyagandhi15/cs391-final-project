"use client"

import React from 'react';
import { UserProvider } from '@/contexts/UserContext'; 
import styled from 'styled-components';
import { useRouter } from 'next/navigation';

const GenreLayoutContainer = styled.div`
  padding: 20px;
  background-color: #f5f5f5;
  font-family: Arial, sans-serif;
`;

const GenreHeader = styled.header`
  padding: 20px;
  background-color: #4CAF50;
  color: white;
  text-align: center;
`;

const GenreNav = styled.nav`
  text-align: center;
  margin: 20px 0;
`;

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

const GenreLayout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter(); 
    return (
    <UserProvider>
      <GenreLayoutContainer>
        <GenreHeader>
          <h1>Genre Breakdown</h1>
        </GenreHeader>
        <GenreNav>
        <StyledButton
            onClick={() => router.push('/')} 
          >
            Home
        </StyledButton>
        </GenreNav>
        <main>{children}</main>
      </GenreLayoutContainer>
    </UserProvider>
  );
};

export default GenreLayout;