// // Author: Diya Gandhi
// // This component serves as the landing page for the app, managing user authentication and navigation to other features.

// "use client";
// import styled from "styled-components";
// import { useEffect, useState } from "react";
// import { SpotifyUser } from "@/interfaces/profile";
// import { useRouter } from "next/navigation";
// import SignInButton from "@/components/authentication/SignIn";
// import SignOutButton from "@/components/authentication/SignOut";
// import StyledButton from "@/components/ui/StyledButton";

// const ButtonContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
//   width: 100%;
// `;

// export default function HomePage() {
//   const [user, setUser] = useState<SpotifyUser | null>(null); // Tracks the authenticated user state.
//   const router = useRouter();

//   useEffect(() => {
//     fetchData(); // Fetch user data on component mount.
//   }, []);

//   // Clears the user state and cookie upon sign-out.
//   const handleSignOut = () => {
//     document.cookie = "token=; Max-Age=0; Path=/";
//     setUser(null);
//   };

//   // Fetches the authenticated user's data from the API.
//   const fetchData = () => {
//     fetch("/api/user", { credentials: "include" }) // Includes cookies in the request.
//       .then((response) => {
//         if (response.ok) {
//           return response.json(); // Parse JSON if the response is successful.
//         } else {
//           throw new Error("Error Fetching User:" + response.statusText); // Handle errors.
//         }
//       })
//       .then((json) => {
//         setUser(json); // Update user state with fetched data.
//       })
//       .catch((error) => console.log(error)); // Log any errors.
//   };

//   return (
//     <div>
//       {!user ? (
//         // Renders the sign-in button if no user is authenticated.
//         <SignInButton />
//       ) : (
//         // Displays navigation and sign-out options for authenticated users.
//         <ButtonContainer>
//           <StyledButton onClick={() => router.push("/genre")}>
//             Genre Breakdown
//           </StyledButton>
//           <StyledButton onClick={() => router.push("/top-artists")}>
//             Top Artists
//           </StyledButton>
//           <StyledButton onClick={() => router.push("/profile")}>
//             Profile
//           </StyledButton>
//           <SignOutButton handleSignOut={handleSignOut} />
//         </ButtonContainer>
//       )}
//     </div>
//   );
// }
"use client";

import Image from "next/image";
import { Box } from "@mui/material";
import { useUser } from "@/contexts/UserContext";
import SignInButton from "@/components/authentication/SignIn";

export default function Home() {
  const { user } = useUser();

  return (
    <>
      <Box width="100%" display="flex" justifyContent="center" marginTop="5rem">
        <Image
          src="/spotify-mobile-apps-icon-free-png.webp"
          alt="spotify logo"
          width="300"
          height="300"
        />
      </Box>
      {!user && (
        <Box
          display="flex"
          width="100%"
          justifyContent="center"
          marginTop="2rem"
        >
          <SignInButton />
        </Box>
      )}
    </>
  );
}
