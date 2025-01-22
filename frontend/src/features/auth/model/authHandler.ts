import { useAuthStore } from "../";
import { authService } from "../";
import { toast } from "react-toastify";

export const useLoginHandler = () => {
  const setLoggedIn = useAuthStore((state) => state.setLoggedIn);

  return async (data: { email: string; password: string }) => {
    try {
      const response = await authService.login(data);
      if (response.success) {
        setLoggedIn(true);
        toast.success("로그인에 성공했습니다!");
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
