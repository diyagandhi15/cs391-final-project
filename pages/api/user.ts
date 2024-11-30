// Code written by Diya Gandhi
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const access_token = req.cookies.access_token;

  if (!access_token) {
    res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const response = await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    console.log(response.data)
    res.status(200).json(response.data);
    //res.status(200).json({message: 'i am diya'})

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
}