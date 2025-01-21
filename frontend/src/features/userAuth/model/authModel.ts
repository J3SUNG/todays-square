import { create } from "zustand";
import { authService } from "../service/authService";
import { LoginRequest } from "../../../entities/user/types/userTypes";

interface AuthState {
  isLoggedIn: boolean;
  login: (data: LoginRequest) => Promise<void>;
}

export const useAuthModel = create<AuthState>((set) => ({
  isLoggedIn: false,
  login: async (data: LoginRequest) => {
    const response = await authService.login(data);

    if (!response.success) {
      throw new Error(response.message || "로그인에 실패했습니다.");
    }

    set({ isLoggedIn: true });
  },
}));
