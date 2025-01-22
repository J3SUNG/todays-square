import { AuthButtonGroup, Button, Form, InputField } from "../../../shared";
import googleImg from "../../../shared/assets/authLogin/google.png";
import kakaoImg from "../../../shared/assets/authLogin/kakao.png";
import githubImg from "../../../shared/assets/authLogin/github.png";
import naverImg from "../../../shared/assets/authLogin/naver.png";

type LoginFormProps = {
  formData: { email: string; password: string };
  onInputChange: (id: string, value: string) => void;
  onSubmit: () => void;
};

export const LoginForm = ({ formData, onInputChange, onSubmit }: LoginFormProps) => {
  return (
    <Form title="Login" onSubmit={onSubmit}>
      <InputField
        id="email"
        label="Email"
        type="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={(value) => onInputChange("email", value)}
      />
      <InputField
        id="password"
        label="Password"
        type="password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={(value) => onInputChange("password", value)}
      />
      <Button text="Log In" primary />
      <Button text="Guest Login" onClick={() => alert("Guest Login")} />
      <AuthButtonGroup
        buttons={[
          { image: googleImg, onClick: () => alert("Google Login") },
          { image: naverImg, onClick: () => alert("Naver Login") },
          { image: kakaoImg, onClick: () => alert("Kakao Login") },
          { image: githubImg, onClick: () => alert("GitHub Login") },
        ]}
      />
    </Form>
  );
};
