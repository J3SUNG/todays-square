import styled from "@emotion/styled";

type StyledButtonProps = {
  primary?: boolean;
};

export const StyledButton = styled.button<StyledButtonProps>`
  display: flex;
  justify-content: center;
  width: 300px;
  height: 50px;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  font-weight: bold;
  color: ${({ primary }) => (primary ? "black" : "white")};
  background-color: ${({ primary }) => (primary ? "white" : "transparent")};
  border: 2px solid white;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;
