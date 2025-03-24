import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import { Global } from '@emotion/react';
import { globalStyles } from '../styles/globalStyles';

interface LayoutProps {
  children: ReactNode;
}

const Main = styled.main`
  min-height: calc(100vh - 60px); // 네비게이션 바 높이 고려
`;

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Global styles={globalStyles} />
      <Main>{children}</Main>
    </>
  );
};

export default Layout;
