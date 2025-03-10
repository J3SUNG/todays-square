import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HomePage, LoginPage } from "../../pages";
import { useAuthStore } from "../../features/auth";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  return isLoggedIn ? <>{children}</> : <Navigate to="/login" />;
};

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <div>Dashboard Page</div>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
