// Code written by Diya Gandhi
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code, state } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'Authorization code is missing' });
  }

  const data = {
    code: code as string,
    redirect_uri: redirect_uri as string,
    grant_type: 'authorization_code',
  };

  const authOptions = {
    headers: {
      'Authorization': `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', data, authOptions);
    const { access_token, refresh_token, expires_in } = response.data;

    res.setHeader('Set-Cookie', `access_token=${access_token}; HttpOnly; Path=/;`);

    res.redirect('/'); 

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to obtain access token' });
  }
}