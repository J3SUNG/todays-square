/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { validateLogin } from "../../../entities/user/model/validateLogin";
import Button from "../../../shared/ui/Button";
import { LoginRequest } from "../../../entities/user";

type LoginFormProps = {
  onLoginSubmit: (data: LoginRequest) => void;
};

const formStyles = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 300px;
  margin: auto;
`;

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
    <form css={formStyles} onSubmit={handleSubmit}>
      <input
        value={username}
        type="text"
        name="username"
        placeholder="Username"
        onChange={(e) => setUserName(e.target.value)}
        required
      />
      <input
        value={password}
        type="password"
        name="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button type="submit" text="Login" />
    </form>
  );
};
