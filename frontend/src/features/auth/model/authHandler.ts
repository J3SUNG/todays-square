import { useAuthStore } from "../";
import { authService } from "../";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useLoginHandler = () => {
  const setLoggedIn = useAuthStore((state) => state.setLoggedIn);
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  return async (data: { email: string; password: string }) => {
    try {
      const response = await authService.login(data);
      if (response.success) {
        setLoggedIn(true);
        setToken(response.token || null);
        setUser(response.user || null);
        toast.success("로그인에 성공했습니다!");
        navigate("/dashboard");
      } else {
        toast.error(response.message || "로그인에 실패했습니다.");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("알 수 없는 오류가 발생했습니다.");
      }
    }
  };
};
