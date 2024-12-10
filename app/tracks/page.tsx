// Created By: Yasmine Jibrell
"use client";
import React from "react";
import TopTracks from "@/app/tracks/TopTracks";
import {
  PageHeading,
  PageLayoutContainer,
} from "@/components/ui/prestyled-components";

/**
 * A React component representing the "Top Tracks" page.
 *
 * This component serves as the main container for displaying the user's
 * top tracks in a styled layout.
 */

export default function TopTracksPage() {
  return (
    <PageLayoutContainer>
      <PageHeading>
        <h1>Top Tracks</h1>
      </PageHeading>
      <TopTracks />
    </PageLayoutContainer>
  );
}
