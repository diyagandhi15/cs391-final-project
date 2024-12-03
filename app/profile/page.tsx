"use client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";

const ProfileContainer = styled.div`
    text-align: center;
    margin: 20px auto;
`;

const ProfileImage = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 50%;
`;

const LogoutButton = styled.button`
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #1db954; // Spotify green
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #1aa34a;
    }
`;

const ProfilePage: React.FC = () => {
    const [profileData, setProfileData] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        // Fetch profile data from the API.
        fetch("/api/profile", { credentials: "include" })
        .then((res) => {
            if (!res.ok) {
            throw new Error("Failed to fetch profile");
            }
            return res.json();
        })
        .then((data) => setProfileData(data))
        .catch((err) => console.error(err));
    }, []);

    const handleLogout = () => {
        document.cookie = "access_token=; Max-Age=0; Path=/"; // Clear token
        router.push("/"); // Redirect to homepage
    };

    if (!profileData) {
        return <div>Loading...</div>;
    }

    return (
        <ProfileContainer>
        <h1>Welcome, {profileData.profile.display_name}!</h1>
        {profileData.profile.images?.[0]?.url && (
            <ProfileImage
            src={profileData.profile.images[0].url}
            alt="Profile Picture"
            />
        )}
        <p>Total Playlists: {profileData.playlistsCount}</p>
        <LogoutButton onClick={handleLogout}>Log Out</LogoutButton>
        </ProfileContainer>
    );
};

export default ProfilePage;
