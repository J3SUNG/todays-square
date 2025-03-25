import axios from "axios";

// 환경 변수에서 API URL 가져오기
// Vite에서는 process.env 대신 import.meta.env 사용
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// Axios 인스턴스 생성
const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 설정
client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터 설정
client.interceptors.response.use(
  (response) => response,
  (error) => {
    // 401 인증 오류 처리
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      // 로그인 페이지로 리다이렉트는 필요한 경우 별도 처리
    }
    return Promise.reject(error);
  }
);

// 간단한 HTTP 클라이언트 훅
export const http = {
  get: <T>(url: string, params = {}) =>
    client.get<T>(url, { params }).then((response) => response.data),

  post: <T>(url: string, data = {}) => client.post<T>(url, data).then((response) => response.data),

  put: <T>(url: string, data = {}) => client.put<T>(url, data).then((response) => response.data),

  delete: <T>(url: string) => client.delete<T>(url).then((response) => response.data),
};

// 이전 코드와의 호환성을 위해 httpClient 이름으로도 내보냄
export const httpClient = http;
