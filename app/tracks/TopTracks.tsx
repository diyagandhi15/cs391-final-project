// Created By: Yasmine Jibrell

"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { ISpotifyTrack } from "@/interfaces/ITracks";
import { CircularProgress, Box } from "@mui/material";

// Styled container for the top tracks section
const TopTracksContainer = styled.div`
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

// Styled container for dropdowns
const DropdownContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

// Styled dropdown (select element)
const Dropdown = styled.select`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

// Styled container for individual track cards
const TrackCard = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

// Styled album art image
const AlbumArt = styled.img`
  width: 64px;
  height: 64px;
  margin-right: 20px;
`;

// Placeholder for when an album image is not available
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
  border-radius: 8px;
`;

// Styled container for track information
const TrackInfo = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

// Styled title for the track name
const TrackName = styled.h3`
  margin: 0;
  font-size: 18px;
`;

// Styled text for the artist's name(s)
const ArtistName = styled.p`
  margin: 0;
  color: gray;
`;

// Styled play button for track preview links
const PlayButton = styled.a`
  padding: 10px 20px;
  background-color: #1db954;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #1ed760;
  }
`;

// Main component to display the user's top tracks
const TopTracks = () => {
  // State for storing the fetched tracks
  const [tracks, setTracks] = useState<ISpotifyTrack[]>([]);

  // State for managing the selected time range (e.g., short_term, medium_term, long_term)
  const [timeRange, setTimeRange] = useState<string>("long_term");

  // State for managing the selected number of tracks to display
  const [trackLimit, setTrackLimit] = useState<number>(20);

  // State for managing the loading indicator
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch top tracks whenever timeRange or trackLimit changes
  useEffect(() => {
    fetchTopTracks();
  }, [timeRange, trackLimit]);

  /**
   * Fetches the user's top tracks from the server-side API.
   */
  const fetchTopTracks = async () => {
    // Show loading indicator
    setLoading(true);
    try {
      const response = await axios.get<{ items: ISpotifyTrack[] }>(
        "/api/toptracks",
        {
          params: {
            time_range: timeRange, // Pass selected time range
            limit: trackLimit, // Pass selected track limit
          },
        }
      );
      // Update state with fetched tracks
      setTracks(response.data.items);
    } catch (error) {
      // Handle Axios-specific errors
      if (axios.isAxiosError(error)) {
        console.error(
          "Axios error fetching top tracks:",
          error.response?.data || error.message
        );
      } else {
        // Handle unexpected errors
        console.error("Unexpected error:", error);
      }
    } finally {
      // Hide loading indicator
      setLoading(false);
    }
  };

  return (
    <TopTracksContainer>
      <DropdownContainer>
        <Dropdown
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
        >
          <option value="short_term">Last 4 Weeks</option>
          <option value="medium_term">Last 6 Months</option>
          <option value="long_term">All Time</option>
        </Dropdown>

        <Dropdown
          value={trackLimit}
          onChange={(e) => setTrackLimit(parseInt(e.target.value, 10))}
        >
          <option value={10}>10 Tracks</option>
          <option value={20}>20 Tracks</option>
          <option value={30}>30 Tracks</option>
          <option value={50}>50 Tracks</option>
        </Dropdown>
      </DropdownContainer>

      {loading ? (
        <Box display="flex" width="100%" justifyContent="center">
          <CircularProgress sx={{ color: "#15a146" }} />
        </Box>
      ) : (
        tracks.map((track) => (
          <TrackCard key={track.id}>
            {track.album.images && track.album.images.length > 0 ? (
              <AlbumArt src={track.album.images[0].url} alt={track.name} />
            ) : (
              <Placeholder>No Image</Placeholder>
            )}
            <TrackInfo>
              <TrackName>{track.name}</TrackName>
              <ArtistName>
                {track.artists.map((artist) => artist.name).join(", ")}
              </ArtistName>
            </TrackInfo>
            {track.preview_url && (
              <PlayButton
                href={track.preview_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Play
              </PlayButton>
            )}
          </TrackCard>
        ))
      )}
    </TopTracksContainer>
  );
};

export default TopTracks;
