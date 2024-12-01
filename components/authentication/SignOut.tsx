// Code written by Diya Gandhi
import StyledButton from "../ui/StyledButton";

const SignOutButton = ({ handleSignOut }: { handleSignOut: () => void }) => {
    return (
      <StyledButton onClick={handleSignOut}>
        Sign Out
      </StyledButton>
    );
  };
  
  export default SignOutButton;