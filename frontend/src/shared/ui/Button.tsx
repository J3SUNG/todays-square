/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

type ButtonProps = {
  text: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
};

const buttonStyles = css`
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Button = ({ text, type = "button", onClick }: ButtonProps) => {
  return (
    <button css={buttonStyles} type={type} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
