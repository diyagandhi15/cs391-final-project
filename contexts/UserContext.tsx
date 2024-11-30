// Code written by Diya Gandhi
"use client"
import { createContext, useContext, useState, ReactNode } from 'react';
import { SpotifyUser } from '../interfaces/profile';

interface UserContextType {
  user: SpotifyUser | null;
  setUser: (user: SpotifyUser | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SpotifyUser | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}