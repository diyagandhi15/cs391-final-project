// Author: Diya Gandhi
// This component is responsible for displaying the top 10 favorite genres fetched from an API.
// It uses `useEffect` to make an API call on component mount and `useState` to manage the genres' state.

"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  PageHeading,
  PageLayoutContainer,
} from "@/components/ui/prestyled-components";
import { CircularProgress, Box } from "@mui/material";

const GenrePageContainer = styled.div`
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const GenreHeading = styled.h2`
  color: #333;
  text-align: center;
`;

const GenreListContainer = styled.div`
  margin-top: 20px;
`;

const GenreItem = styled.div`
  padding: 8px;
  background-color: #f9f9f9;
  margin: 8px 0;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
`;

export default function GenrePage() {
  const [genres, setGenres] = useState<string[]>([]); // State to hold the genres data

  useEffect(() => {
    // Fetch top 10 genres from API on component mount
    fetch("/api/genre")
      .then((response) => response.json())
      .then((data) => {
        setGenres(data.genres.slice(0, 10)); // Display only top 10 genres
      })
      .catch((error) => console.error("Error fetching genres:", error)); // Handle error in case of failed API call
  }, []);

  return (
    <PageLayoutContainer>
      <PageHeading>
        <h1>Genre Breakdown</h1>
      </PageHeading>
      <GenrePageContainer>
        <GenreHeading>Top 10 Favorite Genres</GenreHeading>
        <GenreListContainer>
          {genres.length === 0 ? (
            <Box display="flex" width="100%" justifyContent="center">
              <CircularProgress sx={{ color: "#15a146" }} />
            </Box>
          ) : (
            genres.map((genre, index) => (
              <GenreItem key={index}>
                <span>{genre}</span>
              </GenreItem>
            ))
          )}
        </GenreListContainer>
      </GenrePageContainer>
    </PageLayoutContainer>
  );
}
