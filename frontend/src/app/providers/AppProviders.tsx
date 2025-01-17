import React from "react";
import ThemeProvider from "./ThemeProvider";
import { GlobalStyles } from "../styles/GlobalStyles";

const StyleProviders = ({ children }: { children: React.ReactNode }) => (
  <>
    <GlobalStyles />
    <ThemeProvider>{children}</ThemeProvider>
  </>
);

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <StyleProviders>
      {/* 전역 상태 관리 Provider 추가 */}
      {children}
    </StyleProviders>
  );
};
