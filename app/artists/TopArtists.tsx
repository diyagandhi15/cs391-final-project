// By: Tsz Kit Wong
// This component fetches the user's top artists from the Spotify API and displays them in a list
// Includes the artist's name, image, number of followers, genres, and popularity. Top artist is marked with a crown icon. 
// Displays a loading spinner while fetching data and error message if  fetch fails.

"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CircularProgress, Box } from "@mui/material";
import { SpotifyArtist } from "@/interfaces/artist";

const TopArtistsContainer = styled.div`
  padding: 20px;
  padding-top: 60px;
  background-color: black;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ArtistCardLink = styled.a`
  width: 70%;
  display: flex;
  padding: 20px 10px;
  align-items: center;
  margin: 0 auto;
  margin-bottom: 20px;
  text-decoration: none;
  color: inherit;
  background-color: #121212;

  &:hover {
    background-color: #f9f9f9;
    border-radius: 8px;
    transition: background-color 0.3s ease;
  }
  
  &:hover h3 {
    color: black;
  }

  &:hover div {
    color: black;
  }
`;

const ArtistImage = styled.img`
  width: 110px;
  height: auto;
  margin-right: 40px;
  border-radius: 50%;
`;

const Placeholder = styled.div`
  width: 64px;
  height: 64px;
  background-color: #f0f0f0;
  color: white;
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
  line-height: 1.75;
  color: white;
`;

const ArtistName = styled.h3`
  margin: 0;
  font-size: 22px;
  font-weight: bold;
`;

const FollowersCount = styled.p`
  margin: 0;
  color: gray;
`;

const Rank = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-right: 40px;
  margin-left: 40px;
  color: white;
`;

const AdditionalInfo = styled.p`
  margin: 0;
  color: gray;
  text-transform: capitalize;
`;

const CrownImage = styled.img`
  width: 60px;
  height: auto;
`;

const TopArtists = () => {
  // state variables for top artists, loading state, and error messages
  const [artists, setArtists] = useState<SpotifyArtist[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTopArtists();
  }, []);

  const fetchTopArtists = async () => { // fetch top artists from api
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/topartists`);
      if (!response.ok) { // error handling
        throw new Error("Failed to fetch top artists");
      }
      const data = await response.json();
      setArtists(data.items || []);
    } catch (err) { // error handling
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
        artists.map((artist, index) => ( // map through artists and display artist info
          <ArtistCardLink key={artist.id} href={artist.external_urls.spotify}
                          target="_blank" rel="noopener noreferrer">

            {/* display rank of artist */}
            <Rank>{index + 1}</Rank>

            {/* display artist image, opt to default if no img found from call */}
            {artist.images && artist.images.length > 0 ? (
              <ArtistImage src={artist.images[0].url} alt={artist.name} />
            ) : (
              <Placeholder>No Image</Placeholder>
            )}

            {/* info about the artist provided by the endpoint */}
            <ArtistInfo>
              {/* crown for rank 1 */}
              {index === 0 && (<CrownImage src="/crown.png" alt="Crown"/>)}
              <ArtistName>{artist.name}</ArtistName>
              <FollowersCount>Followers: {artist.followers?.total.toLocaleString() || 0}</FollowersCount>
              <AdditionalInfo>Genres: {artist.genres.join(", ")}</AdditionalInfo>
              <AdditionalInfo>Popularity: {artist.popularity}</AdditionalInfo>
            </ArtistInfo>
            
          </ArtistCardLink>
        ))
      )}
    </TopArtistsContainer>
  );
};

export default TopArtists;
