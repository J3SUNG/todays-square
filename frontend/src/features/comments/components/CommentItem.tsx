import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Comment, useComments } from '../context/CommentsContext';
import { useAuth } from '../../auth';
import { CommentForm } from './CommentForm';

// 날짜 포맷 함수
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

// 스타일 컴포넌트
const CommentContainer = styled.div<{ isReply?: boolean }>`
  padding: 16px;
  border-bottom: 1px solid #eee;
  margin-left: ${props => props.isReply ? '24px' : '0'};
  background-color: ${props => props.isReply ? '#f9f9f9' : 'transparent'};
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
`;

const AuthorName = styled.span`
  font-weight: 500;
  font-size: 14px;
  color: #333;
`;

const CommentDate = styled.span`
  color: #888;
  font-size: 12px;
  margin-left: 8px;
`;

const CommentContent = styled.div`
  font-size: 14px;
  line-height: 1.5;
  white-space: pre-line;
  color: #333;
  margin-bottom: 12px;
`;

const CommentActions = styled.div`
  display: flex;
  gap: 12px;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  font-size: 12px;
  color: #666;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  
  &:hover {
    color: #4a6cf7;
  }
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' | 'danger' }>`
  padding: 4px 8px;
  font-size: 12px;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${props => {
    if (props.variant === 'primary') return '#4a6cf7';
    if (props.variant === 'danger') return '#dc3545';
    return 'transparent';
  }};
  color: ${props => {
    if (props.variant === 'primary' || props.variant === 'danger') return 'white';
    return '#666';
  }};
  border: ${props => {
    if (props.variant === 'primary' || props.variant === 'danger') return 'none';
    return '1px solid #ced4da';
  }};
  margin-left: 8px;
  
  &:hover {
    background-color: ${props => {
      if (props.variant === 'primary') return '#3a5cf7';
      if (props.variant === 'danger') return '#c82333';
      return '#f1f3f5';
    }};
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const ReplyForm = styled.div`
  margin-top: 8px;
  margin-left: 24px;
`;

// Props 타입 정의
type CommentItemProps = {
  comment: Comment;
  postId: string;
};

export const CommentItem: React.FC<CommentItemProps> = ({ comment, postId }) => {
  const { user } = useAuth();
  const { deleteComment, likeComment } = useComments();
  const [isEditing, setIsEditing] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const isAuthor = user && user.id === comment.authorId;
  
  // 댓글 삭제 핸들러
  const handleDelete = async () => {
    if (!window.confirm('정말로 이 댓글을 삭제하시겠습니까?')) {
      return;
    }
    
    setIsDeleting(true);
    await deleteComment(comment.id);
    setIsDeleting(false);
  };
  
  // 댓글 좋아요 핸들러
  const handleLike = async () => {
    try {
      await likeComment(comment.id);
      setIsLiked(!isLiked);
    } catch (error) {
      // 에러 처리는 context에서 처리됨
    }
  };
  
  return (
    <>
      <CommentContainer isReply={!!comment.parentId}>
        <CommentHeader>
          <AuthorInfo>
            <AuthorName>{comment.authorName}</AuthorName>
            <CommentDate>• {formatDate(comment.createdAt)}</CommentDate>
          </AuthorInfo>
          
          {isAuthor && !isEditing && (
            <div>
              <Button
                variant="secondary"
                onClick={() => setIsEditing(true)}
              >
                수정
              </Button>
              <Button
                variant="danger"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? '삭제 중...' : '삭제'}
              </Button>
            </div>
          )}
        </CommentHeader>
        
        {isEditing ? (
          <CommentForm
            postId={postId}
            initialContent={comment.content}
            isEditing={true}
            commentId={comment.id}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <>
            <CommentContent>{comment.content}</CommentContent>
            
            <CommentActions>
              <ActionButton onClick={() => setShowReplyForm(!showReplyForm)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 10 20 15 15 20"></polyline>
                  <path d="M4 4v7a4 4 0 0 0 4 4h12"></path>
                </svg>
                답글
              </ActionButton>
              
              <ActionButton onClick={handleLike}>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                좋아요 {comment.likes}
              </ActionButton>
            </CommentActions>
          </>
        )}
        
        {showReplyForm && (
          <ReplyForm>
            <CommentForm
              postId={postId}
              parentId={comment.id}
            />
          </ReplyForm>
        )}
      </CommentContainer>
      
      {/* 답글 목록 렌더링 */}
      {comment.replies && comment.replies.map(reply => (
        <CommentItem
          key={reply.id}
          comment={reply}
          postId={postId}
        />
      ))}
    </>
  );
};
