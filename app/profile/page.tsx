//Author: Hilal Sena Bayram
// Displays the authenticated user's Spotify profile information: name, email, profile photo, and playlists.
// This page also provides a logout functionality.

"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import {
  PageHeading,
  PageLayoutContainer,
} from "@/components/prestyled-components";

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px auto;
  padding: 2rem;
  background-color: #121212;
  color: #ffffff; /* White text */
  min-height: 100vh; /* Ensuring the container takes up the full height of the page */
`;

const UserInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-right: 1.5rem;
  border: 3px solid #1db954; /* Spotify green border */
`;

const UserInfoText = styled.div`
  text-align: left;
  h2 {
    font-size: 1.8rem;
    margin: 0;
    font-weight: bold;
    color: #1db954; /* Spotify green */
  }
  p {
    margin: 0;
    font-size: 1.2rem;
    color: #b3b3b3; /* Subtle gray text */
  }
`;

const LogoutButton = styled.button`
  padding: 10px 20px;
  background-color: #1db954;
  margin-top: 20px;
  color: #ffffff; /* White text */
  border: none;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #1ed760; /* Lighter Spotify green */
    transform: scale(1.05);
  }
`;

const PlaylistsContainer = styled.div`
  width: 80%;
  max-width: 700px;
  display: flex;
  flex-direction: column;
`;

const PlaylistItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #181818; /* Darker section for playlists */
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 0.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s, background-color 0.3s ease;

  &:hover {
    background-color: #282828; /* Slightly lighter hover effect */
    transform: scale(1.02); /*Enlarging the div when the curser is on it*/
  }

  div {
    display: flex;
    align-items: center;
  }

  h4 {
    font-size: 1.2rem;
    margin-left: 1rem;
    color: #ffffff; /* White text */
  }

  a {
    color: #1db954; /* Spotify green */
    text-decoration: none;
    font-weight: bold;
    transition: color 0.3s ease;

    &:hover {
      color: #ffffff; /* White on hover */
    }
  }
`;

const PlaylistImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 8px;
`;

export default function ProfilePage() {
  const [profileData, setProfileData] = useState<any>(null);
  const [playlists, setPlaylists] = useState<any[]>([]); // Initialize as an empty array to prevent undefined errors

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => {
        setProfileData(data.profile || {}); // Ensure profile data is always an object
        setPlaylists(data.playlists || []); // Ensure playlists is always an array
      })
      .catch((err) => console.error(err));
  }, []);

  const handleLogout = () => {
    document.cookie = "access_token=; Max-Age=0; Path=/"; // Clear access token
    window.location.href = "/"; // Redirect to homepage
  };

  if (!profileData) return <div>Loading...</div>;

  return (
    <PageLayoutContainer>
      <PageHeading>
        <h1>User Profile</h1>
      </PageHeading>
      <UserInfoWrapper>
        <ProfileImage
          src={profileData.images?.[0]?.url || "/default-profile.png"}
          alt="Profile"
        />
        <UserInfoText>
          <h2>{profileData.display_name}</h2>
          <p>{profileData.email}</p>
        </UserInfoText>
      </UserInfoWrapper>

      {/* Display Playlists */}
      <PlaylistsContainer>
        <h3>Your Playlists ({playlists.length})</h3>
        {playlists.map((playlist: any) => (
          <PlaylistItem key={playlist.id}>
            <div>
              <PlaylistImage src={playlist.image} alt={playlist.name} />
              <h4>{playlist.name}</h4>
            </div>
            <Link href={playlist.url} target="_blank" rel="noopener noreferrer">
              Open in Spotify
            </Link>
          </PlaylistItem>
        ))}
      </PlaylistsContainer>
      <LogoutButton onClick={handleLogout}>Sign Out</LogoutButton>
    </PageLayoutContainer>
    // <ProfileContainer>
    //   {/* Display User Info */}
    //   <UserInfoWrapper>
    //     <ProfileImage
    //       src={profileData.images?.[0]?.url || "/default-profile.png"}
    //       alt="Profile"
    //     />
    //     <UserInfoText>
    //       <h2>{profileData.display_name}</h2>
    //       <p>{profileData.email}</p>
    //     </UserInfoText>
    //   </UserInfoWrapper>

    //   {/* Display Playlists */}
    //   <PlaylistsContainer>
    //     <h3>Your Playlists ({playlists.length})</h3>
    //     {playlists.map((playlist: any) => (
    //       <PlaylistItem key={playlist.id}>
    //         <div>
    //           <PlaylistImage src={playlist.image} alt={playlist.name} />
    //           <h4>{playlist.name}</h4>
    //         </div>
    //         <Link href={playlist.url} target="_blank" rel="noopener noreferrer">
    //           Open in Spotify
    //         </Link>
    //       </PlaylistItem>
    //     ))}
    //   </PlaylistsContainer>
    //   <LogoutButton onClick={handleLogout}>Sign Out</LogoutButton>
    // </ProfileContainer>
  );
}
