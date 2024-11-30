// Code written by Diya Gandhi
"use client";

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

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

const GenrePage = () => {
  const [genres, setGenres] = useState<string[]>([]);

  useEffect(() => {
    fetch('/api/genre')
      .then((response) => response.json())
      .then((data) => {
        setGenres(data.genres.slice(0, 10)); // Display the top 10 genres
      })
      .catch((error) => console.error('Error fetching genres:', error));
  }, []);

  return (
    <GenrePageContainer>
      <GenreHeading>Top 10 Favorite Genres</GenreHeading>
      <GenreListContainer>
        {genres.length === 0 ? (
          <p>Loading genres...</p>
        ) : (
          genres.map((genre, index) => (
            <GenreItem key={index}>
              <span>{genre}</span>
            </GenreItem>
          ))
        )}
      </GenreListContainer>
    </GenrePageContainer>
  );
};

export default GenrePage;