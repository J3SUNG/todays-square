import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import { Header } from './Header';
import '../../app/styles/globals.css';

// 스타일 컴포넌트
const Main = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  min-height: calc(100vh - 60px); // 헤더 높이 고려
`;

// Props 타입 정의
type LayoutProps = {
  children: ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <Main>{children}</Main>
    </>
  );
};
