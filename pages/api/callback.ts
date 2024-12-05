// Author: Diya Gandhi
// This API handler processes the authorization code received from Spotify's OAuth callback,
// exchanges it for an access token and refresh token, and stores the access token in a secure cookie.

import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Extract the authorization code and state from the query parameters
  const { code, state } = req.query;

  // If no authorization code is present, return a bad request response
  if (!code) {
    return res.status(400).json({ error: "Authorization code is missing" });
  }

  // Prepare the data to send in the request to exchange the code for an access token
  const data = {
    code: code as string, // Authorization code received from Spotify
    redirect_uri: redirect_uri as string, // Redirect URI used during the authorization request
    grant_type: "authorization_code", // Grant type for the authorization code flow
  };

  // Set the authorization headers for the POST request to Spotify's token endpoint
  const authOptions = {
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${client_id}:${client_secret}`
      ).toString("base64")}`, // Basic auth with client ID and secret
      "Content-Type": "application/x-www-form-urlencoded", // Content type for form data
    },
  };

  try {
    // Make a POST request to Spotify's API to exchange the code for an access token
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      data,
      authOptions
    );

    // Extract access token from the response
    const { access_token } = response.data;
    const { refresh_token } = response.data;

    // Store the access token in an HTTP-only cookie for security
    res.setHeader("Set-Cookie", [
      `access_token=${access_token}; HttpOnly; Path=/;`,
      `refresh_token=${refresh_token}; HttpOnly; Path=/;`,
    ]);

    // Redirect the user to the home page
    res.redirect("/");
  } catch (error) {
    // If an error occurs during the token exchange, log the error and send a server error response
    console.error(error);
    res.status(500).json({ error: "Failed to obtain access token" });
  }
}
