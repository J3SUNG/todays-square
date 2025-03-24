import React from 'react';
import styled from '@emotion/styled';
import { Input, Button, Card } from '../../../shared/ui';

interface LoginFormProps {
  formData: {
    email: string;
    password: string;
  };
  onInputChange: (id: string, value: string) => void;
  onSubmit: () => void;
  isLoading?: boolean;
  error?: string;
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 24px;
  font-size: 24px;
  font-weight: 600;
  color: #333;
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  margin-bottom: 16px;
  font-size: 14px;
  text-align: center;
`;

const SubmitButton = styled(Button)`
  margin-top: 8px;
`;

export const LoginForm: React.FC<LoginFormProps> = ({
  formData,
  onInputChange,
  onSubmit,
  isLoading = false,
  error
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    onInputChange(id, value);
  };
  
  return (
    <Card>
      <Form onSubmit={handleSubmit}>
        <FormTitle>로그인</FormTitle>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <Input
          id="email"
          label="이메일"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="이메일을 입력하세요"
          fullWidth
        />
        
        <Input
          id="password"
          label="비밀번호"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="비밀번호를 입력하세요"
          fullWidth
        />
        
        <SubmitButton
          type="submit"
          variant="primary"
          fullWidth
          isLoading={isLoading}
          disabled={isLoading}
        >
          로그인
        </SubmitButton>
      </Form>
    </Card>
  );
};
