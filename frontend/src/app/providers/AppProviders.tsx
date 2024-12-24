import React from "react";
import ThemeProvider from "./ThemeProvider";
import { GlobalStyles } from "../styles/GlobalStyles";

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <GlobalStyles />
      {/* 전역 상태 관리, Context Provider */}
      {children}
    </ThemeProvider>
  );
};
