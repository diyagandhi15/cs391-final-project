"use client";

import { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button, Drawer } from "@mui/material";
import { useRouter } from "next/navigation";
import { SpotifyUser } from "@/interfaces/profile";
import SignInButton from "@/components/authentication/SignIn";
import { useMediaQuery } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { useUser } from "@/contexts/UserContext";

export default function NavBar() {
  //   const [user, setUser] = useState<SpotifyUser | null>(null); // Tracks the authenticated user state.
  const { user, setUser } = useUser();
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isSmallScreen = useMediaQuery("(max-width: 750px)");

  useEffect(() => {
    fetchData(); // Fetch user data on component mount.
  }, []);

  // Clears the user state and cookie upon sign-out.
  const handleSignOut = () => {
    document.cookie = "token=; Max-Age=0; Path=/";
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
    { label: "Top Artists", path: "/top-artists" },
    { label: "Sign Out", action: handleSignOut },
  ];

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#15a146" }}>
      <Toolbar>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          Spotify Insights
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
