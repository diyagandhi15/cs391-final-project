import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const access_token = req.cookies.access_token; // Retrieve the access token from cookies.

    if (!access_token) {
        return res.status(401).json({ error: 'Unauthorized' }); // Ensure user is authenticated.
    }

    try {
        // Fetch user profile information.
        const profileResponse = await axios.get('https://api.spotify.com/v1/me', {
        headers: { Authorization: `Bearer ${access_token}` },
        });

        // Fetch user's playlists count.
        const playlistsResponse = await axios.get('https://api.spotify.com/v1/me/playlists', {
        headers: { Authorization: `Bearer ${access_token}` },
        params: { limit: 1 }, // Minimize payload size as we only need the total count.
        });

        // Send both profile data and playlists count back as a JSON response.
        res.status(200).json({
        profile: profileResponse.data,
        playlistsCount: playlistsResponse.data.total,
        });
    } catch (error) {
        // Handle errors from Spotify API.
        if (axios.isAxiosError(error)) {
        console.error('Spotify API error:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to fetch profile or playlists data' });
        } else {
        // Handle unexpected errors.
        console.error('Unknown error:', error);
        res.status(500).json({ error: 'An unexpected error occurred' });
        }
    }
}
