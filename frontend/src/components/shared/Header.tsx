import React from 'react';
import styled from '@emotion/styled';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../features/auth';

// 스타일 컴포넌트
const HeaderContainer = styled.header`
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 0 20px;
`;

const HeaderContent = styled.div`
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
  
  &:hover {
    color: #3a5cf7;
  }
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

const UserActions = styled.div`
  display: flex;
  align-items: center;
`;

const UserName = styled.span`
  margin-right: 16px;
  font-weight: 500;
  font-size: 14px;
`;

const Button = styled.button<{ color?: 'primary' | 'default' }>`
  padding: 8px 16px;
  background-color: ${props => props.color === 'primary' ? '#4a6cf7' : 'transparent'};
  color: ${props => props.color === 'primary' ? 'white' : '#333'};
  border: ${props => props.color === 'primary' ? 'none' : '1px solid #ddd'};
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.color === 'primary' ? '#3a5cf7' : '#f1f3f5'};
  }
`;

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuth();
  
  const handleLogout = async () => {
    await logout();
  };
  
  return (
    <HeaderContainer>
      <HeaderContent>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Logo to="/">오늘의 광장</Logo>
          <NavLinks>
            <NavLink to="/">홈</NavLink>
            <NavLink to="/posts">게시판</NavLink>
          </NavLinks>
        </div>
        
        <UserActions>
          {isLoggedIn ? (
            <>
              <UserName>{user?.name}님</UserName>
              <Link to="/posts/create">
                <Button color="primary">글쓰기</Button>
              </Link>
              <Button onClick={handleLogout} style={{ marginLeft: '8px' }}>
                로그아웃
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => navigate('/login')}>로그인</Button>
              <Button 
                color="primary" 
                onClick={() => navigate('/register')}
                style={{ marginLeft: '8px' }}
              >
                회원가입
              </Button>
            </>
          )}
        </UserActions>
      </HeaderContent>
    </HeaderContainer>
  );
};
