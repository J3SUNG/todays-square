import React, { ButtonHTMLAttributes } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

// SOLID의 Open-Closed 원칙을 적용한 버튼 컴포넌트
// 확장에는 열려있고 수정에는 닫혀있는 설계

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
}

const ButtonBase = styled.button<{
  variant: ButtonVariant;
  size: ButtonSize;
  fullWidth: boolean;
  disabled: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;
  border: none;
  
  ${(props) => props.fullWidth && css`
    width: 100%;
  `}
  
  ${(props) => props.disabled && css`
    opacity: 0.6;
    cursor: not-allowed;
  `}
  
  // Size variants
  ${(props) => {
    switch(props.size) {
      case 'small':
        return css`
          padding: 6px 12px;
          font-size: 12px;
        `;
      case 'large':
        return css`
          padding: 12px 24px;
          font-size: 16px;
        `;
      default: // medium
        return css`
          padding: 8px 16px;
          font-size: 14px;
        `;
    }
  }}
  
  // Color variants
  ${(props) => {
    switch(props.variant) {
      case 'primary':
        return css`
          background-color: #4a6cf7;
          color: white;
          &:hover:not(:disabled) {
            background-color: #3a5cf7;
          }
          &:active:not(:disabled) {
            background-color: #2a4cf7;
          }
        `;
      case 'secondary':
        return css`
          background-color: #6c757d;
          color: white;
          &:hover:not(:disabled) {
            background-color: #5c656d;
          }
          &:active:not(:disabled) {
            background-color: #4c555d;
          }
        `;
      case 'outline':
        return css`
          background-color: transparent;
          color: #4a6cf7;
          border: 1px solid #4a6cf7;
          &:hover:not(:disabled) {
            background-color: rgba(74, 108, 247, 0.1);
          }
          &:active:not(:disabled) {
            background-color: rgba(74, 108, 247, 0.2);
          }
        `;
      case 'danger':
        return css`
          background-color: #dc3545;
          color: white;
          &:hover:not(:disabled) {
            background-color: #c82333;
          }
          &:active:not(:disabled) {
            background-color: #bd2130;
          }
        `;
      default:
        return '';
    }
  }}
`;

const LoadingSpinner = styled.span`
  display: inline-block;
  margin-right: 8px;
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  isLoading = false,
  disabled = false,
  ...props
}) => {
  return (
    <ButtonBase
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <LoadingSpinner />}
      {children}
    </ButtonBase>
  );
};
