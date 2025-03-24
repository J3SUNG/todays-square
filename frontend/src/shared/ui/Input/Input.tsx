import React, { InputHTMLAttributes } from 'react';
import styled from '@emotion/styled';

// SOLID의 Single Responsibility 원칙을 적용한 Input 컴포넌트
// 입력 기능만 담당하는 단일 책임 컴포넌트

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const InputContainer = styled.div<{ fullWidth: boolean }>`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  width: ${props => props.fullWidth ? '100%' : 'auto'};
`;

const InputLabel = styled.label`
  font-size: 14px;
  margin-bottom: 6px;
  color: #333;
  font-weight: 500;
`;

const InputField = styled.input<{ hasError: boolean }>`
  padding: 10px 12px;
  border: 1px solid ${props => props.hasError ? '#dc3545' : '#ced4da'};
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? '#dc3545' : '#4a6cf7'};
    box-shadow: ${props => props.hasError 
      ? '0 0 0 0.2rem rgba(220, 53, 69, 0.25)' 
      : '0 0 0 0.2rem rgba(74, 108, 247, 0.25)'};
  }
`;

const ErrorMessage = styled.span`
  color: #dc3545;
  font-size: 12px;
  margin-top: 4px;
`;

export const Input: React.FC<InputProps> = ({
  label,
  error,
  fullWidth = false,
  id,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const hasError = !!error;
  
  return (
    <InputContainer fullWidth={fullWidth}>
      {label && <InputLabel htmlFor={inputId}>{label}</InputLabel>}
      <InputField
        id={inputId}
        hasError={hasError}
        {...props}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputContainer>
  );
};
