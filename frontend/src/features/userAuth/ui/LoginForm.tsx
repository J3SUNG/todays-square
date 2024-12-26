import { useState } from "react";
import { validateLogin } from "../../../entities/user/model/validateLogin";
import Button from "../../../shared/ui/Button";
import { LoginRequest } from "../../../entities/user";
import { LoginFormContainer, LoginFormInput } from "./LoginForm.styles";

type LoginFormProps = {
  onLoginSubmit: (data: LoginRequest) => void;
};

export const LoginForm = ({ onLoginSubmit }: LoginFormProps) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateLogin(username, password)) {
      alert("Please fill in both fields");
      return;
    }

    const loginData: LoginRequest = { username, password };
    onLoginSubmit(loginData);
  };

  return (
    <LoginFormContainer onSubmit={handleSubmit}>
      <LoginFormInput
        value={username}
        type="text"
        name="username"
        placeholder="Username"
        onChange={(e) => setUserName(e.target.value)}
        required
      />
      <LoginFormInput
        value={password}
        type="password"
        name="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button type="submit" text="Login" />
    </LoginFormContainer>
  );
};
