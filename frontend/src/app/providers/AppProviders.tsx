import React, { ReactNode, useEffect } from 'react';
import { useAuthStore } from '../../features/auth';
import { authService } from '../../features/auth';
import { ThemeProvider } from '@emotion/react';
import theme from '../styles/theme';

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
          console.error('세션 유효성 확인 중 오류:', error);
          // 토큰이 유효하지 않은 경우 (error 변수 사용하지 않음)
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
          setLoggedIn(false);
        }
      };
      
      fetchCurrentUser();
    }
  }, [setToken, setUser, setLoggedIn]); // 의존성 배열에 상태 업데이트 함수 추가
  
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
};
