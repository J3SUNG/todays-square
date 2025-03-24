// API 엔드포인트 설정
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
  },
  POSTS: {
    BASE: '/posts',
    DETAIL: (id: string) => `/posts/${id}`,
    COMMENTS: (postId: string) => `/posts/${postId}/comments`,
    LIKE: (id: string) => `/posts/${id}/like`,
  },
  COMMENTS: {
    BASE: '/comments',
    DETAIL: (id: string) => `/comments/${id}`,
    LIKE: (id: string) => `/comments/${id}/like`,
  },
};
