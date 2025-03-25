import { create } from "zustand";
import { AuthState, User } from "./types";

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  token: null,
  user: null,
  setLoggedIn: (status) => set({ isLoggedIn: status }),
  setToken: (token) => set({ token }),
  setUser: (user) => set({ user }),
  logout: () => set({ isLoggedIn: false, token: null, user: null }),
}));
