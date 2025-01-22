import { LoginRequest, LoginResponse } from "../../../entities/user";
import { axiosInstance } from "../../../shared";

export const authService = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await axiosInstance.post<LoginResponse>("/login", data);
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message || "Login failed");
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  },
};
