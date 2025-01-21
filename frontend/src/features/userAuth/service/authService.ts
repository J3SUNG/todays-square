import axios from "axios";
import { axiosInstance } from "../../../shared";
import { LoginRequest, LoginResponse } from "../../../entities/user";

export const authService = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await axiosInstance.post<LoginResponse>("/login", data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || "로그인에 실패했습니다.";
        throw new Error(errorMessage);
      } else {
        throw new Error("예기치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }
    }
  },
};
