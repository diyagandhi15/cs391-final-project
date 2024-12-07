/*
Author: Eric Nohara-LeClair
Description: This navbar component defines a navigation menu that is reused throughout the app by being put in the layout.tsx file. It displays a menu of buttons if a user is signed in, or a sign in button if a user is not signed in. Additionally, it features a drawer option for when the screen shrinks so that the layout of the nav bar looks good on mobile devices.
*/

"use client";

import { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button, Drawer } from "@mui/material";
import { useRouter } from "next/navigation";
import SignInButton from "@/components/authentication/sign-in-button";
import { useMediaQuery } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { useUser } from "@/contexts/UserContext";
import Link from "next/link";

export default function NavBar() {
  const { user, setUser } = useUser(); // set the user that can be accessed in other contexts
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false); // used to open the drawer of buttons

  const isSmallScreen = useMediaQuery("(max-width: 950px)"); // make sure that the screen is not too small

  useEffect(() => {
    fetchData(); // Fetch user data on component mount.
  }, []);

  // Clears the user state and cookie upon sign-out.
  const handleSignOut = async () => {
    await fetch("/api/signout");
    setUser(null);
    router.push("/");
  };

  // Fetches the authenticated user's data from the API.
  const fetchData = async () => {
    try {
      const res = await fetch("/api/user", { credentials: "include" });

      if (!res.ok) {
        setUser(null);
      } else {
        const data = await res.json();
        setUser(data);
      }
    } catch (err) {
      const error = err as Error;
      console.error(error.message);
    }
  };

  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open);
  };

  const navItems = [
    { label: "Profile", path: "/profile" },
    { label: "Genre Breakdown", path: "/genre" },
    { label: "Top Artists", path: "/artists" },
    { label: "Top Tracks", path: "/tracks" },
    { label: "User Playlists", path: "/playlists" },
    { label: "Sign Out", action: handleSignOut },
  ];

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#15a146" }}>
      <Toolbar>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          <Link
            href="/"
            style={{
              textDecoration: "none",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Spotify Insights
          </Link>
        </Typography>
        {user ? (
          isSmallScreen ? (
            <>
              <Button
                color="inherit"
                onClick={() => {
                  toggleDrawer(true);
                }}
              >
                <Menu />
              </Button>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => toggleDrawer(false)}
              >
                {navItems.map((item, index) => (
                  <Button
                    key={index}
                    color="inherit"
                    onClick={() => {
                      if (item.path) router.push(item.path);
                      else if (item.action) item.action();
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Drawer>
            </>
          ) : (
            navItems.map((item, index) => (
              <Button
                key={index}
                color="inherit"
                onClick={() => {
                  if (item.path) router.push(item.path);
                  else if (item.action) item.action();
                }}
              >
                {item.label}
              </Button>
            ))
          )
        ) : (
          <SignInButton />
        )}
      </Toolbar>
    </AppBar>
  );
}
