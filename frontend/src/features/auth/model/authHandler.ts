import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from './authStore';
import { authService } from '../service/authService';
import { toast } from 'react-toastify';
import { getErrorMessage } from '../../../shared/lib/helpers';

interface LoginCredentials {
  email: string;
  password: string;
}

export const useLoginHandler = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setLoggedIn, setToken, setUser } = useAuthStore();
  
  const handleLogin = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { token, user } = await authService.login(credentials);
      
      // 토큰을 로컬 스토리지에 저장
      localStorage.setItem('token', token);
      
      // 인증 상태 업데이트
      setToken(token);
      setUser(user);
      setLoggedIn(true);
      
      toast.success('로그인되었습니다.');
      navigate('/');
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  
  return { handleLogin, isLoading, error };
};

export const useLogoutHandler = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  
  const handleLogout = async () => {
    try {
      await authService.logout();
      
      // 로컬 스토리지에서 토큰 제거
      localStorage.removeItem('token');
      
      // 인증 상태 초기화
      logout();
      
      toast.success('로그아웃되었습니다.');
      navigate('/login');
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };
  
  return handleLogout;
};
