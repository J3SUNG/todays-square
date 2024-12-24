import { login } from "../../entities/user";
import { LoginForm } from "../../features/userAuth/ui/LoginForm";

export const Login = () => {
  const handleLogin = async (username: string, password: string) => {
    try {
      const response = await login(username, password);
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
    <div>
      <h1>Login</h1>
      <LoginForm onLoginSubmit={handleLogin} />
    </div>
  );
};
