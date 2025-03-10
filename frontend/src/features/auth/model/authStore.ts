import { create } from "zustand";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  user: User | null;
  setLoggedIn: (status: boolean) => void;
  setToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  token: null,
  user: null,
  setLoggedIn: (status) => set({ isLoggedIn: status }),
  setToken: (token) => set({ token }),
  setUser: (user) => set({ user }),
  logout: () => set({ isLoggedIn: false, token: null, user: null }),
}));
