import { LoginContainer } from "./LoginPage.styles";
import { LoginForm } from "../../features/auth/ui/LoginForm";
import { useLoginHandler } from "../../features/auth";
import { useState } from "react";

export const LoginPage = () => {
  const handleLogin = useLoginHandler();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const setField = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    handleLogin(formData);
  };

  return (
    <LoginContainer>
      <LoginForm formData={formData} onInputChange={setField} onSubmit={handleSubmit} />
    </LoginContainer>
  );
};
