/*
Author: Eric Nohara-LeClair
Description: this route /api/playlists uses the access token and fetches the current user's playlist data before sending it back to the client. This needed to be on the server side because we needed to access the access_token.
*/

import { NextApiRequest, NextApiResponse } from "next";
import { cookies } from "next/headers";

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

  res.setHeader("Set-Cookie", [
    "access_token=; Max-Age=0; Path=/; HttpOnly", // Ensure to match the same path and domain used when setting the cookie
    "refresh_token=; Max-Age=0; Path=/; HttpOnly", // Clear the refresh token too, if needed
  ]);

  res.status(200).json({ message: "Sign out successful" });
}
