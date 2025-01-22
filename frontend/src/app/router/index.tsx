import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { HomePage, LoginPage } from "../../pages";

type PrivateRouteProps = {
  isAuthenticated: boolean;
  children: React.ReactNode;
};

const PrivateRoute = ({ isAuthenticated, children }: PrivateRouteProps) => {
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export const AppRouter = () => {
  const isAuthenticated = true;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/protected"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <></>
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};
