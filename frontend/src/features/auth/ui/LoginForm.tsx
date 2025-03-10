import { AuthButtonGroup, Button, Form, InputField } from "../../../shared";
import googleImg from "../../../shared/assets/authLogin/google.png";
import kakaoImg from "../../../shared/assets/authLogin/kakao.png";
import githubImg from "../../../shared/assets/authLogin/github.png";
import naverImg from "../../../shared/assets/authLogin/naver.png";
import { authService } from "../service/authService";
import { useAuthStore } from "../model/authStore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type LoginFormProps = {
  formData: { email: string; password: string };
  onInputChange: (id: string, value: string) => void;
  onSubmit: () => void;
};

export const LoginForm = ({ formData, onInputChange, onSubmit }: LoginFormProps) => {
  const setLoggedIn = useAuthStore((state) => state.setLoggedIn);
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  const handleSocialLogin = async (provider: "google" | "kakao" | "github" | "naver") => {
    try {
      const response = await authService.socialLogin(provider);
      if (response.success) {
        setLoggedIn(true);
        if (response.token) setToken(response.token);
        if (response.user) setUser(response.user);
        toast.success("로그인에 성공했습니다!");
        navigate("/dashboard");
      } else {
        toast.error(response.message || "소셜 로그인에 실패했습니다.");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

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
          { image: googleImg, onClick: () => handleSocialLogin("google") },
          { image: naverImg, onClick: () => handleSocialLogin("naver") },
          { image: kakaoImg, onClick: () => handleSocialLogin("kakao") },
          { image: githubImg, onClick: () => handleSocialLogin("github") },
        ]}
      />
    </Form>
  );
};
