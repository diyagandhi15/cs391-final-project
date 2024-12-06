// Created By: Tsz Kit Wong
// components/TopArtists.tsx

"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

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
  border-radius: 50%;
  margin-right: 20px;
`;

const ArtistInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ArtistName = styled.h3`
  margin: 0;
  font-size: 18px;
`;

const ArtistGenre = styled.p`
  margin: 0;
  color: gray;
`;

const SeeMoreButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const TopArtists = () => {
  const [artists, setArtists] = useState([]);
  const [seeMore, setSeeMore] = useState(false);

  useEffect(() => {
    fetchTopArtists();
  }, []);

  const fetchTopArtists = async () => {
    try {
      const response = await axios.get("/api/top-artists");
      setArtists(response.data.items);
    } catch (error) {
      console.error("Error fetching top artists:", error);
    }
  };

  return (
    <TopArtistsContainer>
      {artists.slice(0, seeMore ? artists.length : 10).map((artist) => (
        <ArtistCard key={artist.id}>
          <ArtistImage src={artist.images[0]?.url} alt={artist.name} />
          <ArtistInfo>
            <ArtistName>{artist.name}</ArtistName>
            <ArtistGenre>{artist.genres.join(", ")}</ArtistGenre>
          </ArtistInfo>
        </ArtistCard>
      ))}
      <SeeMoreButton onClick={() => setSeeMore(!seeMore)}>
        {seeMore ? "See Less" : "See More"}
      </SeeMoreButton>
    </TopArtistsContainer>
  );
};

export default TopArtists;
