// Code written by Diya Gandhi
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const getTopArtists = async (accessToken: string) => {
  const url = 'https://api.spotify.com/v1/me/top/artists?limit=20';

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
      throw new Error('Failed to fetch top artists');
    }
    console.error('Unknown error occurred');
    throw new Error('Unknown error occurred');
  }
};

const extractGenres = (artists: any[]) => {
  const genres: string[] = [];
  artists.forEach((artist) => {
    genres.push(...artist.genres);
  });
  return genres;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const access_token = req.cookies.access_token;

  if (!access_token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    console.log('Fetching top artists...');
    const data = await getTopArtists(access_token);
    console.log('Fetched data:', data);

    const genres = extractGenres(data.items);
    console.log('Extracted genres:', genres);

    res.status(200).json({ genres });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error:', error.message);
      res.status(500).json({ error: error.message });
    } else {
      console.error('Unknown error occurred');
      res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
}