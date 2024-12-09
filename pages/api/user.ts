// Author: Diya Gandhi
// API handler for fetching user data from Spotify API
// This endpoint retrieves the authenticated user's data from Spotify using their access token stored in cookies.

import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

// Main API handler to process the request and response
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Extract the access token from cookies for authentication with Spotify API.
  const access_token = req.cookies.access_token;

  // If there's no access token, return an unauthorized error response.
  if (!access_token) {
    res.status(401).json({ error: "Unauthorized" });
    return; // Ensure the function exits after responding.
  }

  try {
    // Send a GET request to Spotify's 'me' endpoint to fetch user details.
    const response = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${access_token}`, // Provide the access token in the Authorization header.
      },
    });

    // Log the user data (for debugging purposes).
    // console.log(response.data);

    // Return the user data as JSON in the response.
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);

    // Return an error response if the request to Spotify fails.
    res.status(500).json({ error: "Failed to fetch user data" });
  }
}
