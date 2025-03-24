import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Layout } from './components/shared';
import { AuthProvider, useAuth } from './features/auth';
import { PostsProvider } from './features/posts';
import { CommentsProvider } from './features/comments';
import {
  HomePage,
  LoginPage,
  PostDetailPage,
  CreatePostPage,
  EditPostPage
} from './pages';

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

// 앱 프로바이더 (모든 컨텍스트 프로바이더 포함)
const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthProvider>
      <PostsProvider>
        <CommentsProvider>
          {children}
        </CommentsProvider>
      </PostsProvider>
    </AuthProvider>
  );
};

const App: React.FC = () => {
  return (
    <AppProviders>
      <BrowserRouter>
        <Layout>
          <Routes>
            {/* 공개 경로 */}
            <Route path="/" element={<HomePage />} />
            <Route path="/posts" element={<HomePage />} />
            <Route path="/posts/:id" element={<PostDetailPage />} />
            
            {/* 비인증 사용자만 접근 가능한 경로 */}
            <Route path="/login" element={
              <PublicOnlyRoute>
                <LoginPage />
              </PublicOnlyRoute>
            } />
            
            {/* 인증된 사용자만 접근 가능한 경로 */}
            <Route path="/posts/create" element={
              <PrivateRoute>
                <CreatePostPage />
              </PrivateRoute>
            } />
            <Route path="/posts/:id/edit" element={
              <PrivateRoute>
                <EditPostPage />
              </PrivateRoute>
            } />
            
            {/* 404 페이지 */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
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
      </BrowserRouter>
    </AppProviders>
  );
};

export default App;
