import React from "react";

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* 전역 상태 관리, Context Provider */}
      {children}
    </>
  );
};
