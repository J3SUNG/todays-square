import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { 
  HomePage, 
  LoginPage,
  PostPage,
  CreatePostPage 
} from "../../pages";
import { useAuthStore } from "../../features/auth";

// 보호된 경로 래퍼 컴포넌트
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  return isLoggedIn ? <>{children}</> : <Navigate to="/login" />;
};

// 로그인 사용자는 접근할 수 없는 경로 래퍼 컴포넌트
const PublicOnlyRoute = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  return !isLoggedIn ? <>{children}</> : <Navigate to="/" />;
};

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 공개 경로 */}
        <Route path="/" element={<HomePage />} />
        <Route path="/posts" element={<HomePage />} />
        <Route path="/posts/:id" element={<PostPage />} />
        
        {/* 인증된 사용자만 접근 가능한 경로 */}
        <Route
          path="/posts/create"
          element={
            <PrivateRoute>
              <CreatePostPage />
            </PrivateRoute>
          }
        />
        
        {/* 비인증 사용자만 접근 가능한 경로 */}
        <Route
          path="/login"
          element={
            <PublicOnlyRoute>
              <LoginPage />
            </PublicOnlyRoute>
          }
        />
        
        {/* 404 리다이렉트 */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};
