// Created By: Yasmine Jibrell
"use client";
import React from "react";
import TopTracks from "@/components/TopTracks";
import {
  PageHeading,
  PageLayoutContainer,
} from "@/components/prestyled-components";

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
