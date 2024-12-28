import axiosInstance from "../../../shared/api/axiosInstance";
import { LoginRequest, LoginResponse } from "../types/userTypes";
import axios from "axios";

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post<LoginResponse>("/login", data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Login API Error:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Login failed.");
    } else {
      console.error("Unexpected Error:", error);
      throw error;
    }
  }
};
