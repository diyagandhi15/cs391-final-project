//Author: Hilal Sena Bayram
// This file defines a backend API route that retrieves Spotify profile and playlists data
// of the authenticated user. Using Spotify Web API to fetch the required data.

import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import axios from "axios";

export const dynamic = "force-dynamic";

export async function GET(): Promise<NextResponse> {
  const cookieStore = await cookies();
  const access_token = cookieStore.get("access_token")?.value;

  if (!access_token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Fetch user profile from Spotify API
    const profileRes = await axios.get("https://api.spotify.com/v1/me", {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    // Fetch user's playlists from Spotify API
    const playlistsRes = await axios.get(
      "https://api.spotify.com/v1/me/playlists",
      {
        headers: { Authorization: `Bearer ${access_token}` },
        params: { limit: 50 }, // Getting at most 50 playlists
      }
    );

    // Fetch user's top artists from Spotify API
    const topArtistsRes = await axios.get(
      "https://api.spotify.com/v1/me/top/artists",
      {
        headers: { Authorization: `Bearer ${access_token}` },
        params: { limit: 10, time_range: "short_term" },
      }
    )

    return NextResponse.json({
      profile: profileRes.data,
      playlists: playlistsRes.data.items.map(
        (playlist: any) =>
          playlist && {
            id: playlist.id,
            name: playlist.name,
            url: playlist.external_urls.spotify,
            image: playlist.images
              ? playlist.images[0]?.url
              : "/music-note.png",
            owner: playlist.owner.display_name,
            numtracks: playlist.tracks.total,
          }
      ), // Simplify playlist data for frontend
      topArtists: topArtistsRes.data.items.map(
        (artist: any) =>
          artist && {
            id: artist.id,
            name: artist.name,
            url: artist.external_urls.spotify,
            image: artist.images
              ? artist.images[0]?.url
              : "/default-profile.png",
            followers: artist.followers.total,
          }
      ),
    });
  } catch (error) {
    console.error(error);
    console.error("Error fetching profile data:");
    return NextResponse.json(
      { error: "Failed to fetch profile data" },
      { status: 500 }
    );
  }
}
