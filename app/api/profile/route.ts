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
        const profileUrl = "https://api.spotify.com/v1/me";
        const profileRes = await axios.get(profileUrl, {
        headers: { Authorization: `Bearer ${access_token}` },
        });

    // calls helper function to fetch user's playlist info
    // The playlist user created
    const allPlaylists = await fetchAllPlaylists(access_token);

    // Simplify playlist data for frontend and return
    return NextResponse.json({
        profile: profileRes.data,
        playlists: allPlaylists.map(
            (playlist: any) =>
            playlist && {
                id: playlist.id,
                name: playlist.name,
                url: playlist.external_urls.spotify,
                //if user doesnt have a profile image set the default profile image as their image
                image: playlist.images?.[0]?.url || "/music-note.png",
                owner: playlist.owner.display_name,
                numtracks: playlist.tracks.total,
            }
        ),
        playlistCount: allPlaylists.length, // Total number of playlists
        });
    } catch (error) {
        console.error("Error fetching profile data");
        return NextResponse.json(
        { error: "Failed to fetch profile data" },
        { status: 500 }
        );
    }
}

// Function to fetch all playlists
const fetchAllPlaylists = async (accessToken: string): Promise<any[]> => {
    // Fetch all playlists using pagination
    // Spotify api limits the number of items to return Max:50
    const allPlaylists: any[] = [];
    const limit = 50; // Maximum items per request
    let offset = 0;

    try {
        // Keep fetching playlists until no more items are returned or offset exceeds max limit
        do {
        const playlistsUrl = `https://api.spotify.com/v1/me/playlists?limit=${limit}&offset=${offset}`;
        const playlistsRes = await axios.get(playlistsUrl, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        // Add fetched playlists to the allPlaylists array
        allPlaylists.push(...playlistsRes.data.items);

        // Update offset for the next batch
        offset += limit;

        // Stop when the number of items fetched is less than the limit
        // or offset exceeds the max limit
        if (playlistsRes.data.items.length < limit || offset > 100000) break;
        } while (true);
    } catch (error) {
        console.error("Error fetching playlists:", error);
        throw new Error("Failed to fetch playlists");
    }

    return allPlaylists;
};
