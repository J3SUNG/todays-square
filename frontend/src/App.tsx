import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Layout } from "./components/shared";
import { AuthProvider, useAuth } from "./features/auth";
import { HomePage, LoginPage } from "./pages";

// 인증된 사용자만 접근 가능한 라우트
const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isLoggedIn ? <>{children}</> : <Navigate to="/login" />;
};

// 비인증 사용자만 접근 가능한 라우트
const PublicOnlyRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return !isLoggedIn ? <>{children}</> : <Navigate to="/" />;
};

// 앱 내부 라우터
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* 공개 경로 */}
      <Route path="/" element={<HomePage />} />

      {/* 비인증 사용자만 접근 가능한 경로 */}
      <Route
        path="/login"
        element={
          <PublicOnlyRoute>
            <LoginPage />
          </PublicOnlyRoute>
        }
      />

      {/* 인증된 사용자만 접근 가능한 경로 */}
      <Route
        path="/game"
        element={
          <PrivateRoute>
            <div>게임 페이지 - 구현 예정</div>
          </PrivateRoute>
        }
      />
      <Route
        path="/history"
        element={
          <PrivateRoute>
            <div>게임 기록 페이지 - 구현 예정</div>
          </PrivateRoute>
        }
      />
      <Route
        path="/ranking"
        element={
          <PrivateRoute>
            <div>랭킹 페이지 - 구현 예정</div>
          </PrivateRoute>
        }
      />

      {/* 404 페이지 */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

// 앱 프로바이더
const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppProviders>
        <Layout>
          <AppRoutes />
        </Layout>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </AppProviders>
    </BrowserRouter>
  );
};

export default App;
