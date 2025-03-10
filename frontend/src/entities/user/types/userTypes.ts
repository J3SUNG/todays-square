export interface User {
  id: string;
  email: string;
  name: string;
}

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  success: boolean;
  token?: string;
  message?: string;
  user?: User;
};
