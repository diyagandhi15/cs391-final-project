"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CircularProgress, Box } from "@mui/material";
import { SpotifyArtist } from "@/interfaces/artist";

const TopArtistsContainer = styled.div`
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ArtistCard = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ArtistImage = styled.img`
  width: 64px;
  height: 64px;
  margin-right: 20px;
  border-radius: 50%;
`;

const Placeholder = styled.div`
  width: 64px;
  height: 64px;
  background-color: #f0f0f0;
  color: gray;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  border: 1px solid #ccc;
  border-radius: 50%;
`;

const ArtistInfo = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const ArtistName = styled.h3`
  margin: 0;
  font-size: 18px;
`;

const FollowersCount = styled.p`
  margin: 0;
  color: gray;
`;

const TopArtists = () => {
  const [artists, setArtists] = useState<SpotifyArtist[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTopArtists();
  }, []);

  const fetchTopArtists = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/artists?time_range=medium_term&limit=10`);
      if (!response.ok) {
        throw new Error("Failed to fetch top artists");
      }
      const data = await response.json();
      setArtists(data.items || []);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TopArtistsContainer>
      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress sx={{ color: "#1db954" }} />
        </Box>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        artists.map((artist) => (
          <ArtistCard key={artist.id}>
            {artist.images && artist.images.length > 0 ? (
              <ArtistImage src={artist.images[0].url} alt={artist.name} />
            ) : (
              <Placeholder>No Image</Placeholder>
            )}
            <ArtistInfo>
              <ArtistName>{artist.name}</ArtistName>
              <FollowersCount>
                Followers: {artist.followers?.total.toLocaleString() || 0}
              </FollowersCount>
            </ArtistInfo>
          </ArtistCard>
        ))
      )}
    </TopArtistsContainer>
  );
};

export default TopArtists;
