import { css } from "@emotion/react";
import theme from "../styles/theme";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

const buttonStyles = css`
  background-color: ${theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;

  &:hover {
    background-color: ${theme.colors.secondary};
  }
`;

const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button css={buttonStyles} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
