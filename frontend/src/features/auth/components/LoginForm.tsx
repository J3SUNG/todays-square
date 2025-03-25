import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useAuthStore } from '..';
import { useNavigate } from 'react-router-dom';

const FormContainer = styled.form`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 24px;
  font-size: 24px;
  font-weight: 600;
  color: #333;
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #4a6cf7;
    box-shadow: 0 0 0 0.2rem rgba(74, 108, 247, 0.25);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 10px 12px;
  background-color: #4a6cf7;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #3a5cf7;
  }
  
  &:disabled {
    background-color: #a2b2fb;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  margin-bottom: 16px;
  font-size: 14px;
  text-align: center;
`;

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { isLoading, error } = useAuthStore();
  const login = useAuthStore(state => state.login);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { email, password } = formData;
    
    try {
      await login(email, password);
      navigate('/');
    } catch {
      // 에러 처리는 AuthContext에서 수행
    }
  };
  
  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormTitle>로그인</FormTitle>
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      <FormGroup>
        <Label htmlFor="email">이메일</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="이메일을 입력하세요"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </FormGroup>
      
      <FormGroup>
        <Label htmlFor="password">비밀번호</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </FormGroup>
      
      <Button type="submit" disabled={isLoading}>
        {isLoading ? '로그인 중...' : '로그인'}
      </Button>
    </FormContainer>
  );
};
