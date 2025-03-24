import { httpClient } from '../../../shared/lib/http';
import { API_ENDPOINTS } from '../../../shared/config/apiConfig';
import { User } from '../../../entities/user';

// 인증 서비스 인터페이스
interface IAuthService {
  login(credentials: { email: string; password: string }): Promise<{ token: string; user: User }>;
  register(userData: { email: string; password: string; name: string }): Promise<{ token: string; user: User }>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User>;
}

// 구체적인 서비스 구현
class AuthService implements IAuthService {
  async login(credentials: { email: string; password: string }): Promise<{ token: string; user: User }> {
    return httpClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
  }
  
  async register(userData: { email: string; password: string; name: string }): Promise<{ token: string; user: User }> {
    return httpClient.post(API_ENDPOINTS.AUTH.REGISTER, userData);
  }
  
  async logout(): Promise<void> {
    return httpClient.post(API_ENDPOINTS.AUTH.LOGOUT);
  }
  
  async getCurrentUser(): Promise<User> {
    return httpClient.get(API_ENDPOINTS.AUTH.ME);
  }
}

// 싱글톤 인스턴스 생성
export const authService = new AuthService();
