import { StyledButton } from "./Button.styles";

type ButtonProps = {
  text: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
};

const Button = ({ text, type = "button", onClick }: ButtonProps) => {
  return (
    <StyledButton type={type} onClick={onClick}>
      {text}
    </StyledButton>
  );
};

export default Button;
