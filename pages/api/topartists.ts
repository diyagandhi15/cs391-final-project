// By: Tsz Kit Wong
// This details the api response for the top artists endpoint, which includes:
// the items array, each containing an artist object.

import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

// fetch top artists
const getTopArtists = async (accessToken: string) => {
  const url = `https://api.spotify.com/v1/me/top/artists`; // Spotify top artists endpoint

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`, // access token in api call headers
      },
    });
    return response.data;
  } catch (error) {  // error handling
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.error?.message || error.message;
      console.error("Spotify API error:", errorMessage);
      throw new Error("Failed to fetch top artists");
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const access_token = req.cookies.access_token; // get access token from cookies

  if (!access_token) { // check if access token is present
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    console.log("Fetching top artists...");
    const data = await getTopArtists(access_token); // call helper with access token
    console.log("Fetched top artists:", data);

    res.status(200).json(data);
  } catch (error: unknown) { // error handling
    if (error instanceof Error) {
      console.error("Error:", error.message);
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Unknown error occurred" });
    }
  }
}
