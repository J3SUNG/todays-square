import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Login } from "../../pages";
import { Navigate } from "react-router-dom";

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
        <Route path="/" element={<Home />} />
        <Route
          path="/protected"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <></>
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};
