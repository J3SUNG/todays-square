import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Button } from '../../../shared/ui';
import { validators } from '../../../shared/lib/helpers';

interface CommentFormProps {
  postId: string;
  parentId?: string;
  initialContent?: string;
  onSubmit: (content: string) => Promise<void>;
  isSubmitting: boolean;
  isEditing?: boolean;
  onCancel?: () => void;
}

const FormContainer = styled.form`
  margin-bottom: 20px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  min-height: 80px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  margin-bottom: 8px;
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
  margin-top: -4px;
  margin-bottom: 8px;
  display: block;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

export const CommentForm: React.FC<CommentFormProps> = ({
  postId, // postId는 향후 API 호출 확장 시 사용될 수 있음
  parentId,
  initialContent = '',
  onSubmit,
  isSubmitting,
  isEditing = false,
  onCancel
}) => {
  const [content, setContent] = useState(initialContent);
  const [error, setError] = useState('');
  
  const validateContent = (value: string): boolean => {
    const errorMessage = validators.required(value);
    setError(errorMessage);
    return !errorMessage;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    if (error) {
      validateContent(e.target.value);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    // postId를 로깅하여 활용
    console.debug(`댓글 작성 - 게시물 ID: ${postId}`);
    e.preventDefault();
    
    if (!validateContent(content)) {
      return;
    }
    
    try {
      await onSubmit(content);
      if (!isEditing) {
        setContent(''); // 새 댓글 작성 시에만 폼 초기화
      }
    } catch (error) {
      console.error('댓글 제출 오류:', error);
      // 에러는 부모 컴포넌트에서 처리
    }
  };
  
  return (
    <FormContainer onSubmit={handleSubmit}>
      <TextArea
        value={content}
        onChange={handleChange}
        placeholder={parentId ? "답글을 입력하세요..." : "댓글을 입력하세요..."}
      />
      {error && <ErrorText>{error}</ErrorText>}
      
      <ButtonContainer>
        {isEditing && onCancel && (
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
            size="small"
          >
            취소
          </Button>
        )}
        <Button 
          type="submit" 
          variant="primary" 
          isLoading={isSubmitting}
          disabled={isSubmitting}
          size="small"
        >
          {isEditing ? '수정하기' : parentId ? '답글 작성' : '댓글 작성'}
        </Button>
      </ButtonContainer>
    </FormContainer>
  );
};
