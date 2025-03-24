import React, { useState } from 'react';
import { LoginContainer } from './LoginPage.styles';
import { LoginForm } from '../../features/auth/ui/LoginForm';
import { useLoginHandler } from '../../features/auth/model/authHandler';

export const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { handleLogin, isLoading, error } = useLoginHandler();
  
  const setField = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };
  
  const handleSubmit = () => {
    handleLogin(formData);
  };
  
  return (
    <LoginContainer>
      <LoginForm 
        formData={formData} 
        onInputChange={setField} 
        onSubmit={handleSubmit}
        isLoading={isLoading}
        error={error ?? undefined}
      />
    </LoginContainer>
  );
};

export default LoginPage;
