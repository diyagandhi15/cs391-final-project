// Author: Diya Gandhi
// This component defines the root layout of the application, providing global structure, styles, and the UserContext for state management.

'use client'; 
import { UserProvider } from '@/contexts/UserContext';
import { ReactNode } from 'react'
import styled from 'styled-components';

const H1 = styled.h1`
  text-align: center;
  color: #4CAF50;
  font-size: 50px;
  font-family: 'Arial', sans-serif;
`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
        <H1> Spotify Insights App </H1>
        <main>{children}</main>
        </UserProvider>
      </body>
    </html>
  );
}