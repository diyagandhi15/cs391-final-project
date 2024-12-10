// Created By: Yasmine Jibrell

import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

/**
 * Fetches the user's top tracks from the Spotify API.
 *
 * accessToken - The access token for authenticating the Spotify API request.
 * limit - The maximum number of tracks to fetch (default is 20).
 * timeRange - The time range for top tracks ("short_term", "medium_term", or "long_term").
 * returns - A promise that resolves to the data containing the top tracks.
 */
const getTopTracks = async (
  accessToken: string,
  limit: number,
  timeRange: string
) => {
  // Construct the Spotify API endpoint for fetching top tracks
  const url = `https://api.spotify.com/v1/me/top/tracks?limit=${limit}&time_range=${timeRange}`;

  try {
    // Make a GET request to the Spotify API with the authorization header
    const response = await axios.get(url, {
      headers: {
        // Use the access token for authentication
        Authorization: `Bearer ${accessToken}`,
      },
    });
    // Return the data from the API response
    return response.data;
  } catch (error) {
    // Handle errors related to the Axios request
    if (axios.isAxiosError(error)) {
      const errorMessage =
        // Get error message from response or Axios error object
        error.response?.data?.error?.message || error.message;

      // Log the error to the server console
      console.error("Spotify API error:", errorMessage);
      // Throw a generic error for the caller
      throw new Error("Failed to fetch top tracks");
    }
  }
};

/**
 * API handler for processing requests to fetch top tracks.
 *
 * req - The incoming API request object.
 * res - The outgoing API response object.
 */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Retrieve the access token from the request cookies
  const access_token = req.cookies.access_token;

  // Check if the access token is available, otherwise return an unauthorized error
  if (!access_token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Extract query parameters for limit and time_range with default values
  const { limit = 20, time_range = "medium_term" } = req.query;

  try {
    // Fetch the user's top tracks using the helper function
    const data = await getTopTracks(
      access_token,
      parseInt(limit as string, 10), // Convert the limit to a number
      time_range as string // Ensure time_range is treated as a string
    );

    // Respond with the fetched data in JSON format
    res.status(200).json(data);
  } catch (error: unknown) {
    // Handle any errors that occur during the API call
    if (error instanceof Error) {
      console.error("Error:", error.message); // Log the error message
      res.status(500).json({ error: error.message }); // Return a server error response
    }
  }
}
