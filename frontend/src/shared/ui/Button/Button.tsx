import { StyledButton } from "./Button.styles";

type ButtonProps = {
  text: string;
  primary?: boolean;
  onClick?: () => void;
};

export const Button = ({ text, primary = false, onClick }: ButtonProps) => (
  <StyledButton primary={primary} onClick={onClick}>
    {text}
  </StyledButton>
);
