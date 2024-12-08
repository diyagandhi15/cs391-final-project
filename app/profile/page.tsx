//Author: Hilal Sena Bayram
// Displays the authenticated user's Spotify profile information: name, email, profile photo, and playlists.
// This page also provides a logout functionality.

"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import { PageHeading, PageLayoutContainer,} from "@/components/ui/prestyled-components";
import { CircularProgress, Box } from "@mui/material";
import PlaylistCard from "@/components/PlaylistCard";

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  padding: 2rem;
  background-color: #121212;
  color: #ffffff; /* White text */
  min-height: 100vh; /* Ensuring the container takes up the full height of the page */
`;

const UserInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 2rem;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-right: 1.5rem;
  border: 3px solid #1db954; /* Spotify green border */
`;

const UserInfoText = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  h2 {
    font-size: 1.8rem;
    margin: 0;
    font-weight: bold;
    color: #1db954; /* Spotify green */
  }
  p {
    margin: 0;
    margin-top: 0.5rem;
    font-size: 1.2rem;
    color: #b3b3b3; /* Subtle gray text */
  }

  i {
    color: grey;
    font-weight: 100;
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
  background-color: #1c1c1c;
  border: 2px solid #1db954;
  color: #ffffff;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #282828;
  }
`;

const CollapsibleContainer = styled.div`
  width: 80%;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
`;

const StyledItalicP = styled.p`
  font-style: italic;
  color: #b3b3b3;
  margin-top: 0.5rem;
`;

export default function ProfilePage() {
  const [profileData, setProfileData] = useState<any>(null);
  const [playlists, setPlaylists] = useState<any[]>([]); // Initialize as an empty array to prevent undefined errors
  const [isPlaylistsOpen, setIsPlaylistsOpen] = useState(false);


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

  return (
    <PageLayoutContainer>
      <PageHeading>
        <h1>User Profile</h1>
      </PageHeading>
      {profileData ? (
        <ProfileContainer>
          {/* Display User Info */}
          <UserInfoWrapper>
            <ProfileImage src={profileData.images?.[0]?.url || "/default-profile.jpg"} alt="Profile photo"/>
            <UserInfoText>
              <h2>{profileData.display_name}</h2>
              <p><strong>Email:</strong> {profileData.email}</p>
              <p><strong>Country:</strong> {profileData.country}</p>
            </UserInfoText>
          </UserInfoWrapper>

          {/* Display Playlists */}

          {/* Collapsible Playlists */}
          <PlaylistsContainer onClick={() => setIsPlaylistsOpen(!isPlaylistsOpen)}>
            <span>You have {playlists.length} playlists</span>
          </PlaylistsContainer>
          {isPlaylistsOpen && (
            <CollapsibleContainer>
              {playlists.map((playlist) => (
                <PlaylistCard
                  key={playlist.id}
                  id={playlist.id}
                  name={playlist.name}
                  image={playlist.image || "/default-profile.png"}
                  url={playlist.url}
                />
              ))}
            </CollapsibleContainer>
          )}

          <LogoutButton onClick={handleLogout}>Sign Out</LogoutButton>
          
        </ProfileContainer>
      ) : (
        <Box
          display="flex"
          width="100%"
          justifyContent="center"
          marginTop="2rem"
        >
          <CircularProgress sx={{ color: "#15a146" }} />
        </Box>
      )}
    </PageLayoutContainer>
  );
}
