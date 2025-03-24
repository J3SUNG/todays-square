import React, { ReactNode, useEffect } from 'react';
import { useAuthStore } from '../../features/auth';
import { authService } from '../../features/auth';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../styles/theme';

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  const { setUser, setLoggedIn, setToken } = useAuthStore();
  
  // 앱 시작 시 토큰이 있으면 사용자 정보 불러오기
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);
      
      const fetchCurrentUser = async () => {
        try {
          const user = await authService.getCurrentUser();
          setUser(user);
          setLoggedIn(true);
        } catch (error) {
          // 토큰이 유효하지 않은 경우
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
          setLoggedIn(false);
        }
      };
      
      fetchCurrentUser();
    }
  }, []);
  
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
};
