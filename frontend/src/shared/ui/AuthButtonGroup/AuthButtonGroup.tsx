import { AuthButtonGroupWrapper, AuthButtonWrapper } from "./AuthButtonGroup.styles";

type AuthButtonProps = {
  image: string;
  onClick?: () => void;
};

type AuthButtonGroupProps = {
  buttons: AuthButtonProps[];
};

export const AuthButtonGroup = ({ buttons }: AuthButtonGroupProps) => (
  <AuthButtonGroupWrapper>
    {buttons.map((button, index) => (
      <AuthButtonWrapper key={index} image={button.image} onClick={button.onClick} />
    ))}
  </AuthButtonGroupWrapper>
);
