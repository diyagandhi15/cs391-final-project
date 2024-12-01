// Author: Diya Gandhi
// This file defines a React context for managing user authentication and data throughout the app.

"use client";
import { createContext, useContext, useState, ReactNode } from 'react';
import { SpotifyUser } from '../interfaces/profile';

// Defines the shape of the UserContext with user data and a setter function.
interface UserContextType {
  user: SpotifyUser | null; // The currently authenticated Spotify user, or null if not signed in.
  setUser: (user: SpotifyUser | null) => void; // Function to update the user state.
}

// Create the UserContext with an undefined default value to ensure usage within a provider.
const UserContext = createContext<UserContextType | undefined>(undefined);

// UserProvider: Provides the user context to its children components.
export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SpotifyUser | null>(null); // Manages the user state.

  return (
    // Passes the user state and updater function to the context provider.
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

// useUser: Custom hook to access the UserContext.
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context; // Returns the user state and setter function.
}