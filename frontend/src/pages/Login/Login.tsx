import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
      toast.success("로그인에 성공했습니다!");
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  return (
    <LoginContainer>
      <LoginForm onLoginSubmit={handleLogin} />
    </LoginContainer>
  );
};
