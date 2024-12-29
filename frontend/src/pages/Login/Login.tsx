import { useNavigate } from "react-router-dom";
import { LoginRequest, login } from "../../entities/user";
import { LoginForm } from "../../features/userAuth/ui/LoginForm";
import { LoginContainer } from "./Login.styles";

export const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (data: LoginRequest) => {
    const response = await login(data);

    if (response.success) {
      onLoginSuccess(response.token);
    }
  };

  const onLoginSuccess = (token: string) => {
    console.log("Token received:", token);
    navigate("/home");
  };

  return (
    <LoginContainer>
      <LoginForm onLoginSubmit={handleLogin} />
    </LoginContainer>
  );
};
