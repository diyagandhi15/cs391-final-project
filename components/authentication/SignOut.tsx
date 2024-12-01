// Author: Diya Gandhi
// This component renders a reusable button for signing out, utilizing a passed-in handler function.

import StyledButton from "../ui/StyledButton";

const SignOutButton = ({ handleSignOut }: { handleSignOut: () => void }) => {
  return (
    <StyledButton onClick={handleSignOut}>
      Sign Out
    </StyledButton>
  );
};

export default SignOutButton;