// Created By: Yasmine Jibrell


import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const getTopTracks = async (accessToken: string, limit: number, timeRange: string) => {
  const url = `https://api.spotify.com/v1/me/top/tracks?limit=${limit}&time_range=${timeRange}`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.error?.message || error.message;
      console.error('Spotify API error:', errorMessage);
      throw new Error('Failed to fetch top tracks');
    }
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const access_token = req.cookies.access_token;

  if (!access_token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { limit = 20, time_range = 'medium_term' } = req.query;

  try {
    console.log('Fetching top tracks...');
    const data = await getTopTracks(access_token, parseInt(limit as string, 10), time_range as string);
    console.log('Fetched top tracks:', data);

    res.status(200).json(data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error:', error.message);
      res.status(500).json({ error: error.message });
    }
  }
}
