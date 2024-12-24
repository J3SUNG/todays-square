export const validateLogin = (username: string, password: string): boolean => {
  return username.trim() !== "" && password.trim() !== "";
};
