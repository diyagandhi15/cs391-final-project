// Author: Diya Gandhi
// A reusable styled button component for consistent design across the app

import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: #4CAF50; 
  color: white; 
  padding: 10px 20px; 
  border: none; 
  border-radius: 5px; 
  font-size: 20px; 

  &:hover {
    background-color: #45a049; 
  }
`;

export default StyledButton;