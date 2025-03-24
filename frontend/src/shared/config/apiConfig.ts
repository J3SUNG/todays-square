// API 설정
export const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:3000/api';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
  },
  POSTS: {
    BASE: '/posts',
    GET_BY_ID: (id: string) => `/posts/${id}`,
    COMMENTS: (postId: string) => `/posts/${postId}/comments`,
  },
  COMMENTS: {
    BASE: '/comments',
    GET_BY_ID: (id: string) => `/comments/${id}`,
  },
};
