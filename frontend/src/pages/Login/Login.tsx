import { useNavigate } from "react-router-dom";
import { LoginForm } from "../../features/userAuth/ui/LoginForm";
import { LoginContainer } from "./Login.styles";
import { useAuthModel } from "../../features/userAuth/model/authModel";
import { LoginRequest } from "../../entities/user";

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuthModel();

  const handleLogin = async (data: LoginRequest) => {
    try {
      await login(data);
      navigate("/home");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <LoginContainer>
      <LoginForm onLoginSubmit={handleLogin} />
    </LoginContainer>
  );
};
