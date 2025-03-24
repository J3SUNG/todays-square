import React from 'react';
import styled from '@emotion/styled';
import { LoginForm } from '../features/auth';

// 스타일 컴포넌트
const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 120px);
  padding: 20px;
`;

export const LoginPage: React.FC = () => {
  return (
    <PageContainer>
      <LoginForm />
    </PageContainer>
  );
};
