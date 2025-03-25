import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Button, Input } from '../../../shared/ui';
import { PostFormData } from '../../../entities/post';
import { validators } from '../../../shared/lib/helpers';

interface PostFormProps {
  initialData?: PostFormData;
  onSubmit: (data: PostFormData) => Promise<void>;
  isSubmitting: boolean;
}

const FormContainer = styled.form`
  max-width: 800px;
  margin: 0 auto;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  min-height: 200px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  margin-bottom: 16px;
  resize: vertical;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: #4a6cf7;
    box-shadow: 0 0 0 0.2rem rgba(74, 108, 247, 0.25);
  }
`;

const ErrorText = styled.span`
  color: #dc3545;
  font-size: 12px;
  margin-top: -12px;
  margin-bottom: 12px;
  display: block;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
  gap: 12px;
`;

export const PostForm: React.FC<PostFormProps> = ({
  initialData = { title: '', content: '' },
  onSubmit,
  isSubmitting
}) => {
  const [formData, setFormData] = useState<PostFormData>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // 입력 필드 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // 실시간 유효성 검사
    if (errors[name]) {
      validateField(name, value);
    }
  };
  
  // 필드별 유효성 검사
  const validateField = (name: string, value: string) => {
    let error = '';
    
    switch (name) {
      case 'title':
        error = validators.required(value) || validators.maxLength(100)(value);
        break;
      case 'content':
        error = validators.required(value);
        break;
      default:
        break;
    }
    
    setErrors(prev => ({ ...prev, [name]: error }));
    return !error;
  };
  
  // 전체 폼 유효성 검사
  const validateForm = (): boolean => {
    const fields = Object.keys(formData) as Array<keyof PostFormData>;
    const newErrors: Record<string, string> = {};
    let isValid = true;
    
    fields.forEach(field => {
      const value = formData[field];
      const fieldIsValid = validateField(field, value as string);
      if (!fieldIsValid) {
        isValid = false;
        newErrors[field] = errors[field];
      }
    });
    
    setErrors(newErrors);
    return isValid;
  };
  
  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      await onSubmit(formData);
      // 제출 성공 후 폼 초기화는 부모 컴포넌트에서 처리
    } catch {
      // 에러는 부모 컴포넌트에서 처리
    }
  };
  
  return (
    <FormContainer onSubmit={handleSubmit}>
      <Input
        label="제목"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="게시물 제목을 입력하세요"
        fullWidth
        error={errors.title}
      />
      
      <label htmlFor="content" style={{ display: 'block', marginBottom: '6px', fontWeight: 500 }}>
        내용
      </label>
      <TextArea
        id="content"
        name="content"
        value={formData.content}
        onChange={handleChange}
        placeholder="게시물 내용을 입력하세요"
      />
      {errors.content && <ErrorText>{errors.content}</ErrorText>}
      
      <ButtonContainer>
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => window.history.back()}
        >
          취소
        </Button>
        <Button 
          type="submit" 
          variant="primary" 
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          {initialData.title ? '수정하기' : '작성하기'}
        </Button>
      </ButtonContainer>
    </FormContainer>
  );
};
