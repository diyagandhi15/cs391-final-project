"use client";

import { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button, Drawer } from "@mui/material";
import { useRouter } from "next/navigation";
import { SpotifyUser } from "@/interfaces/profile";
import SignInButton from "@/components/authentication/SignIn";
import { useMediaQuery } from "@mui/material";
import { Menu } from "@mui/icons-material";

export default function NavBar() {
  const [user, setUser] = useState<SpotifyUser | null>(null); // Tracks the authenticated user state.
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
  };

  // Fetches the authenticated user's data from the API.
  const fetchData = () => {
    fetch("/api/user", { credentials: "include" }) // Includes cookies in the request.
      .then((response) => {
        if (response.ok) {
          return response.json(); // Parse JSON if the response is successful.
        } else {
          throw new Error("Error Fetching User:" + response.statusText); // Handle errors.
        }
      })
      .then((json) => {
        setUser(json); // Update user state with fetched data.
      })
      .catch((error) => console.log(error)); // Log any errors.
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

  return user ? (
    <AppBar position="sticky" sx={{ backgroundColor: "#4caf50" }}>
      <Toolbar>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          Spotify Insights
        </Typography>

        {isSmallScreen ? (
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
        )}
      </Toolbar>
    </AppBar>
  ) : (
    <AppBar position="sticky" sx={{ backgroundColor: "#4caf50" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Spotify Insights
        </Typography>
        <SignInButton />
      </Toolbar>
    </AppBar>
  );
}
