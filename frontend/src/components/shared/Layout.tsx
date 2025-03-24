import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import { Global } from '@emotion/react';
import { Header } from './Header';

// 전역 스타일
const globalStyles = `
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  body {
    font-family: 'Noto Sans KR', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: 14px;
    line-height: 1.5;
    color: #333;
    background-color: #f8f9fa;
  }
  
  a {
    color: #4a6cf7;
    text-decoration: none;
  }
  
  button {
    cursor: pointer;
  }
  
  ul, ol {
    list-style: none;
  }
  
  img {
    max-width: 100%;
    height: auto;
  }
`;

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
      <Global styles={globalStyles} />
      <Header />
      <Main>{children}</Main>
    </>
  );
};
