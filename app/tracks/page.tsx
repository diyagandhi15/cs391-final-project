// Created By: Yasmine Jibrell
"use client";
import React from "react";
import TopTracks from "@/app/tracks/TopTracks";
import {
  PageHeading,
  PageLayoutContainer,
} from "@/components/ui/prestyled-components";

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
