import React from 'react';
import styled from '@emotion/styled';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../features/auth';
import { Button } from '../../shared/ui';

const NavbarContainer = styled.header`
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 0 20px;
`;

const NavbarContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 20px;
  font-weight: 700;
  color: #4a6cf7;
  text-decoration: none;
`;

const NavLinks = styled.nav`
  display: flex;
  align-items: center;
`;

const NavLink = styled(Link)`
  margin-left: 24px;
  color: #333;
  text-decoration: none;
  font-size: 14px;
  
  &:hover {
    color: #4a6cf7;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const UserName = styled.span`
  margin-right: 16px;
  font-weight: 500;
`;

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuthStore();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <NavbarContainer>
      <NavbarContent>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Logo to="/">오늘의 광장</Logo>
          <NavLinks>
            <NavLink to="/">홈</NavLink>
            <NavLink to="/posts">게시판</NavLink>
          </NavLinks>
        </div>
        
        {isLoggedIn ? (
          <UserInfo>
            <UserName>{user?.name}</UserName>
            <Button 
              variant="outline" 
              size="small"
              onClick={handleLogout}
            >
              로그아웃
            </Button>
          </UserInfo>
        ) : (
          <div>
            <Button 
              variant="outline" 
              size="small"
              onClick={() => navigate('/login')}
            >
              로그인
            </Button>
          </div>
        )}
      </NavbarContent>
    </NavbarContainer>
  );
};
