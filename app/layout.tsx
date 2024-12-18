// Author: Diya Gandhi
// This component defines the root layout of the application, providing global structure, styles, and the UserContext for state management.

import { UserProvider } from "@/contexts/UserContext";
import { ReactNode } from "react";
import NavBar from "./navbar";
import "./globals.css";

export const metadata = {
  title: "Spotify Insights App",
  description: "App to view your spotify insights",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <NavBar />
          <main>{children}</main>
        </UserProvider>
      </body>
    </html>
  );
}
