// Created By: Tsz Kit Wong

"use client";

import React from "react";
import TopArtists from "@/app/artists/TopArtists";
import {
  PageHeading,
  PageLayoutContainer,
} from "@/components/ui/prestyled-components";

const TopArtistsPage = () => {
  return (
    <PageLayoutContainer>
      <PageHeading>
        <h1>Top Artists</h1>
      </PageHeading>
      <TopArtists />
    </PageLayoutContainer>
  );
};

export default TopArtistsPage;
