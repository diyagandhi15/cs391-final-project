// Author: Diya Gandhi
// API handler for fetching top artists' genres from Spotify API
// This endpoint retrieves the authenticated user's top artists from Spotify and extracts their genres.

import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

// Function to fetch the top artists of the user from Spotify API
const getTopArtists = async (accessToken: string) => {
  const url = "https://api.spotify.com/v1/me/top/artists?limit=20";

  try {
    // Send GET request to fetch top artists with the provided access token.
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`, // Include the authorization token in the request header
      },
    });
    return response.data; // Return the response data containing top artists
  } catch (error) {
    // Handle specific errors from the API request
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.error?.message || error.message;
      console.error("Spotify API error:", errorMessage);
      throw new Error("Failed to fetch top artists");
    }
  }
};

// Function to extract genres from an array of artist data
const extractGenres = (artists: any[]) => {
  const genres: string[] = []; // Initialize an empty array to store genres
  artists.forEach((artist) => {
    genres.push(...artist.genres); // Add each artist's genres to the genres array
  });
  return genres; // Return the array of all genres
};

// Main API handler to process the request and response
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Retrieve the access token from cookies for authentication
  const access_token = req.cookies.access_token;

  // If no access token is found, return an unauthorized error response
  if (!access_token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const data = await getTopArtists(access_token); // Fetch the top artists data from Spotify
    const genres = extractGenres(data.items); // Extract genres from the fetched artists' data

    // Send the genres back to the client as a JSON response
    res.status(200).json({ genres });
  } catch (error: unknown) {
    // Error handling
    if (error instanceof Error) {
      console.error("Error:", error.message);
      res.status(500).json({ error: error.message });
    }
  }
}
