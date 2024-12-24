import axiosInstance from "../../../shared/api/axiosInstance";
import { LoginRequest, LoginResponse } from "../types/userTypes";

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post<LoginResponse>("/login", data);
    return response.data;
  } catch (error) {
    console.error("Login API Error:", error);
    throw error;
  }
};
