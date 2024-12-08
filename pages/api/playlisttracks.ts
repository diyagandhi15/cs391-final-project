/*
Author: Eric Nohara-LeClair
Description: this route /api/playlisttracks uses the access token and fetches the tracks from the current playlist before sending it back to the client. This needed to be on the server side because we needed to access the access_token.
*/

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

  const playlist = req.query.playlist as string;
  const limit = req.query.limit as string;
  const page = req.query.page as string;

  if (!playlist || !limit || !page) {
    return res.status(400).json({ message: "Missing parameters" });
  }

  const offset = parseInt(page) * parseInt(limit);

  const playlistUrl = `https://api.spotify.com/v1/playlists/${playlist}/tracks?offset=${offset}&limit=${limit}`;

  try {
    const resp = await fetch(playlistUrl, {
      method: "GET",
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });

    const data = await resp.json();

    console.log(data.items);

    if (!resp.ok) throw new Error(data.message);

    res.status(200).json({ items: data.items });
  } catch (err) {
    // error handling - need to cast to error
    const error = err as Error;
    console.error(error.message);
    res.status(400).json({ message: error.message });
  }
}
