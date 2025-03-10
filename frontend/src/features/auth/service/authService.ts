import { LoginRequest, LoginResponse } from "../../../entities/user";
import { axiosInstance } from "../../../shared";
import axios from "axios";

export const authService = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await axiosInstance.post<LoginResponse>("/auth/login", data);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "로그인에 실패했습니다.");
      }
      throw error;
    }
  },

  socialLogin: async (
    provider: "google" | "kakao" | "github" | "naver"
  ): Promise<LoginResponse> => {
    try {
      const response = await axiosInstance.get<LoginResponse>(`/auth/${provider}`);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "소셜 로그인에 실패했습니다.");
      }
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
  },
};
