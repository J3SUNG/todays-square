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
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("예기치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }
    }
  };

  return (
    <LoginContainer>
      <LoginForm onLoginSubmit={handleLogin} />
    </LoginContainer>
  );
};
