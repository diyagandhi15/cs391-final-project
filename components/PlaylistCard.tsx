//Author: Hilal Sena Bayram
//This component is responsible for displaying individual Spotify playlists 
//as cards in the user's profile page. It receives playlist data as props
//and renders each playlist card with its details.

import React from "react";
import styled from "styled-components";
import Link from "next/link";
import {Playlist} from "../interfaces/userplaylist";

const PlaylistItemContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #181818;
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 0.5rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    transition: transform 0.2s, background-color 0.3s ease;

    &:hover {
        background-color: #282828;
        transform: scale(1.02);
    }

    div {
        display: flex;
        align-items: center;
    }

    h4 {
        font-size: 1.2rem;
        margin-left: 1rem;
        color: #ffffff;
    }

    a {
        color: #1db954;
        text-decoration: none;
        font-weight: bold;
        transition: color 0.3s ease;

        &:hover {
        color: #ffffff;
        }
    }
`;

const PlaylistImage = styled.img`
    width: 60px;
    height: 60px;
    border-radius: 8px;
`;

export default function PlaylistCard(props: Playlist) {
    return (
    <PlaylistItemContainer>
        <div>
            <PlaylistImage src={props.image} alt={props.name} />
            <h4>{props.name}</h4>
        </div>
        <Link href={props.url} target="_blank" rel="noopener noreferrer">
            Open in Spotify
        </Link>
    </PlaylistItemContainer>
    );
}
