/*
Author: Eric Nohara-LeClair
Description: this route /api/track uses the access token and fetches the specified track provided in the query string */

import { NextApiRequest, NextApiResponse } from "next";

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

  const track = req.query.track as string;

  if (!track) {
    return res.status(400).json({ message: "Missing track ID parameter" });
  }

  const trackUrl = `https://api.spotify.com/v1/tracks/${track}`;

  try {
    const resp = await fetch(trackUrl, {
      method: "GET",
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });

    const data = await resp.json();

    if (!resp.ok) throw new Error(data.message);

    res.status(200).json({ images: data.album.images });
  } catch (err) {
    // error handling - need to cast to error
    const error = err as Error;
    console.error(error.message);
    res.status(400).json({ message: error.message });
  }
}
