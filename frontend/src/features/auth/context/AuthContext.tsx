import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { http } from '../../../shared/lib/http';
import { API_ENDPOINTS } from '../../../shared/config/apiConfig';
import { toast } from 'react-toastify';

// 사용자 타입 정의
type User = {
  id: string;
  email: string;
  name: string;
};

// 인증 상태 타입 정의
type AuthState = {
  isLoggedIn: boolean;
  user: User | null;
  isLoading: boolean;
  error: string | null;
};

// 인증 액션 타입 정의
type AuthActions = {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
};

// Context 타입 정의
type AuthContextType = AuthState & AuthActions;

// Context 생성
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider 컴포넌트 props 타입
type AuthProviderProps = {
  children: ReactNode;
};

// Provider 컴포넌트
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // 상태 정의
  const [state, setState] = useState<AuthState>({
    isLoggedIn: false,
    user: null,
    isLoading: true,
    error: null,
  });

  // 초기 인증 상태 확인
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setState(prev => ({ ...prev, isLoading: false }));
        return;
      }
      
      try {
        const user = await http.get<User>(API_ENDPOINTS.AUTH.ME);
        setState({
          isLoggedIn: true,
          user,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        localStorage.removeItem('token');
        setState({
          isLoggedIn: false,
          user: null,
          isLoading: false,
          error: null,
        });
      }
    };
    
    checkAuth();
  }, []);

  // 로그인 액션
  const login = async (email: string, password: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const { token, user } = await http.post<{ token: string; user: User }>(
        API_ENDPOINTS.AUTH.LOGIN, 
        { email, password }
      );
      
      localStorage.setItem('token', token);
      
      setState({
        isLoggedIn: true,
        user,
        isLoading: false,
        error: null,
      });
      
      toast.success('로그인되었습니다.');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || '로그인에 실패했습니다.';
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: errorMessage,
      }));
      toast.error(errorMessage);
      throw error;
    }
  };

  // 로그아웃 액션
  const logout = async () => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      await http.post(API_ENDPOINTS.AUTH.LOGOUT);
      localStorage.removeItem('token');
      
      setState({
        isLoggedIn: false,
        user: null,
        isLoading: false,
        error: null,
      });
      
      toast.success('로그아웃되었습니다.');
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }));
      toast.error('로그아웃 중 오류가 발생했습니다.');
    }
  };

  // 회원가입 액션
  const register = async (email: string, password: string, name: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const { token, user } = await http.post<{ token: string; user: User }>(
        API_ENDPOINTS.AUTH.REGISTER, 
        { email, password, name }
      );
      
      localStorage.setItem('token', token);
      
      setState({
        isLoggedIn: true,
        user,
        isLoading: false,
        error: null,
      });
      
      toast.success('회원가입이 완료되었습니다.');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || '회원가입에 실패했습니다.';
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: errorMessage,
      }));
      toast.error(errorMessage);
      throw error;
    }
  };

  // Context 값
  const value = {
    ...state,
    login,
    logout,
    register,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
