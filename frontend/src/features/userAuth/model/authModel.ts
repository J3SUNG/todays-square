import { create } from "zustand";
import { authService } from "../service/authService";
import { LoginRequest } from "../../../entities/user/types/userTypes";

interface AuthState {
  isLoggedIn: boolean;
  login: (data: LoginRequest) => Promise<void>;
}

export const useAuthModel = create<AuthState>((set) => ({
  isLoggedIn: false,
  login: async (data) => {
    try {
      await authService.login(data);
      set({ isLoggedIn: true });
    } catch (error) {
      console.error("Login failed:", error);
    }
  },
}));
