import { LoginRequest, login } from "../../entities/user";
import { LoginForm } from "../../features/userAuth/ui/LoginForm";
import { LoginContainer } from "./Login.styles";

export const Login = () => {
  const handleLogin = async (data: LoginRequest) => {
    try {
      const response = await login(data);
      if (response.success) {
        console.log("Login successful:", response);
        onLoginSuccess(response.token);
      } else {
        alert("Invalid login credentials");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("An error occurred during login.");
    }
  };

  const onLoginSuccess = (token: string) => {
    console.log("Token received:", token);
  };

  return (
    <LoginContainer>
      <LoginForm onLoginSubmit={handleLogin} />
    </LoginContainer>
  );
};
