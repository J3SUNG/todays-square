import React, { useState } from 'react';
import styled from '@emotion/styled';
import { PostFormData } from '../context/PostsContext';

// 폼 컨테이너 스타일
const FormContainer = styled.form`
  width: 100%;
`;

// 폼 그룹 스타일
const FormGroup = styled.div`
  margin-bottom: 20px;
`;

// 라벨 스타일
const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
`;

// 인풋 스타일
const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: #4a6cf7;
    box-shadow: 0 0 0 0.2rem rgba(74, 108, 247, 0.25);
  }
`;

// 텍스트 에어리어 스타일
const TextArea = styled.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 16px;
  min-height: 200px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #4a6cf7;
    box-shadow: 0 0 0 0.2rem rgba(74, 108, 247, 0.25);
  }
`;

// 에러 메시지 스타일
const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 13px;
  margin-top: 5px;
`;

// 버튼 컨테이너 스타일
const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

// 버튼 스타일
const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 10px 16px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  
  background-color: ${props => props.variant === 'primary' ? '#4a6cf7' : '#6c757d'};
  color: white;
  
  &:hover {
    background-color: ${props => props.variant === 'primary' ? '#3a5cf7' : '#5c656d'};
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

// Props 타입 정의
type PostFormProps = {
  initialData?: PostFormData;
  onSubmit: (data: PostFormData) => Promise<void>;
  isSubmitting?: boolean;
  onCancel?: () => void;
};

export const PostForm: React.FC<PostFormProps> = ({
  initialData = { title: '', content: '' },
  onSubmit,
  isSubmitting = false,
  onCancel,
}) => {
  // 폼 데이터 상태
  const [formData, setFormData] = useState<PostFormData>(initialData);
  
  // 유효성 검사 에러 상태
  const [errors, setErrors] = useState<{
    title?: string;
    content?: string;
  }>({});
  
  // 폼 입력 핸들러
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // 실시간 유효성 검사
    if (errors[name as keyof typeof errors]) {
      validateField(name, value);
    }
  };
  
  // 필드 유효성 검사
  const validateField = (name: string, value: string) => {
    let error = '';
    
    if (name === 'title') {
      if (!value.trim()) {
        error = '제목을 입력해주세요.';
      } else if (value.length > 100) {
        error = '제목은 100자 이내로 입력해주세요.';
      }
    } else if (name === 'content') {
      if (!value.trim()) {
        error = '내용을 입력해주세요.';
      }
    }
    
    setErrors(prev => ({ ...prev, [name]: error }));
    return !error;
  };
  
  // 폼 전체 유효성 검사
  const validateForm = () => {
    const titleValid = validateField('title', formData.title);
    const contentValid = validateField('content', formData.content);
    
    return titleValid && contentValid;
  };
  
  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      await onSubmit(formData);
    } catch (error) {
      // 오류 처리는 onSubmit에서 수행
    }
  };
  
  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormGroup>
        <Label htmlFor="title">제목</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="제목을 입력하세요"
        />
        {errors.title && <ErrorMessage>{errors.title}</ErrorMessage>}
      </FormGroup>
      
      <FormGroup>
        <Label htmlFor="content">내용</Label>
        <TextArea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="내용을 입력하세요"
        />
        {errors.content && <ErrorMessage>{errors.content}</ErrorMessage>}
      </FormGroup>
      
      <ButtonContainer>
        {onCancel && (
          <Button 
            type="button" 
            variant="secondary"
            onClick={onCancel}
          >
            취소
          </Button>
        )}
        <Button 
          type="submit" 
          variant="primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? '처리 중...' : initialData.title ? '수정하기' : '작성하기'}
        </Button>
      </ButtonContainer>
    </FormContainer>
  );
};
