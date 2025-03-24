import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useComments, CommentFormData } from '../context/CommentsContext';

// 스타일 컴포넌트
const Form = styled.form`
  margin-bottom: 16px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 14px;
  min-height: 80px;
  resize: vertical;
  margin-bottom: 8px;
  
  &:focus {
    outline: none;
    border-color: #4a6cf7;
    box-shadow: 0 0 0 0.2rem rgba(74, 108, 247, 0.25);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 6px 12px;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${props => props.variant === 'primary' ? '#4a6cf7' : 'transparent'};
  color: ${props => props.variant === 'primary' ? 'white' : '#666'};
  border: ${props => props.variant === 'primary' ? 'none' : '1px solid #ced4da'};
  
  &:hover {
    background-color: ${props => props.variant === 'primary' ? '#3a5cf7' : '#f1f3f5'};
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

// Props 타입 정의
type CommentFormProps = {
  postId: string;
  parentId?: string;
  initialContent?: string;
  isEditing?: boolean;
  commentId?: string;
  onCancel?: () => void;
};

export const CommentForm: React.FC<CommentFormProps> = ({
  postId,
  parentId,
  initialContent = '',
  isEditing = false,
  commentId,
  onCancel,
}) => {
  const [content, setContent] = useState(initialContent);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createComment, updateComment } = useComments();
  
  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      if (isEditing && commentId) {
        // 댓글 수정
        await updateComment(commentId, content);
        if (onCancel) onCancel();
      } else {
        // 새 댓글 작성
        const commentData: CommentFormData = {
          content,
          postId,
          ...(parentId && { parentId })
        };
        
        await createComment(commentData);
        setContent('');
      }
    } catch (error) {
      // 에러 처리는 context에서 처리됨
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Form onSubmit={handleSubmit}>
      <TextArea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={parentId ? "답글을 입력하세요..." : "댓글을 입력하세요..."}
        required
      />
      
      <ButtonContainer>
        {isEditing && onCancel && (
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
          disabled={isSubmitting || !content.trim()}
        >
          {isSubmitting 
            ? '처리 중...' 
            : isEditing 
              ? '수정하기' 
              : parentId 
                ? '답글 작성' 
                : '댓글 작성'}
        </Button>
      </ButtonContainer>
    </Form>
  );
};
