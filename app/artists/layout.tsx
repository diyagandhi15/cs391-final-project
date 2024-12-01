// Created By: Tsz Kit Wong

import React from 'react';

const ArtistsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <h1>Artists Layout</h1>
      {children}
    </div>
  );
};

export default ArtistsLayout;