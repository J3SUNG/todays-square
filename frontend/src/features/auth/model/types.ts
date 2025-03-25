// 사용자 정보 타입
export interface User {
  id: string;
  email: string;
  name: string;
}

// 인증 상태 타입
export interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  user: User | null;
  setLoggedIn: (status: boolean) => void;
  setToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  logout: () => void;
}

// 로그인 폼 데이터
export interface LoginFormData {
  email: string;
  password: string;
}

// 회원가입 폼 데이터
export interface RegisterFormData {
  email: string;
  password: string;
  name: string;
}
