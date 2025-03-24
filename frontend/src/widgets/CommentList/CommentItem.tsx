import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Comment } from '../../entities/comment';
import { formatDate } from '../../shared/lib/helpers';
import { useAuthStore } from '../../features/auth';
import { useUpdateCommentHandler, useDeleteCommentHandler, CommentForm } from '../../features/comment';
import { Button } from '../../shared/ui';

interface CommentItemProps {
  comment: Comment;
  postId: string;
}

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

const ReplyContainer = styled.div`
  margin-top: 16px;
  margin-left: 24px;
`;

export const CommentItem: React.FC<CommentItemProps> = ({ comment, postId }) => {
  const { user } = useAuthStore();
  const { updateComment, isSubmitting: isUpdating } = useUpdateCommentHandler();
  const { deleteComment, isDeleting } = useDeleteCommentHandler();
  const [isEditing, setIsEditing] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  
  const isAuthor = user && user.id === comment.authorId;
  
  const handleUpdate = async (content: string) => {
    const success = await updateComment(comment.id, content);
    if (success) {
      setIsEditing(false);
    }
  };
  
  const handleDelete = async () => {
    if (window.confirm('정말로 이 댓글을 삭제하시겠습니까?')) {
      await deleteComment(comment.id);
    }
  };
  
  if (isEditing) {
    return (
      <CommentContainer isReply={!!comment.parentId}>
        <CommentHeader>
          <AuthorInfo>
            {comment.authorName}
            <CommentDate>{formatDate(comment.createdAt)}</CommentDate>
          </AuthorInfo>
        </CommentHeader>
        <CommentForm
          postId={postId}
          initialContent={comment.content}
          onSubmit={handleUpdate}
          isSubmitting={isUpdating}
          isEditing
          onCancel={() => setIsEditing(false)}
        />
      </CommentContainer>
    );
  }
  
  return (
    <>
      <CommentContainer isReply={!!comment.parentId}>
        <CommentHeader>
          <AuthorInfo>
            {comment.authorName}
            <CommentDate>{formatDate(comment.createdAt)}</CommentDate>
          </AuthorInfo>
          {isAuthor && (
            <div>
              <Button 
                variant="outline" 
                size="small"
                onClick={() => setIsEditing(true)}
              >
                수정
              </Button>
              <Button 
                variant="danger" 
                size="small"
                onClick={handleDelete}
                isLoading={isDeleting}
                disabled={isDeleting}
                style={{ marginLeft: '8px' }}
              >
                삭제
              </Button>
            </div>
          )}
        </CommentHeader>
        <CommentContent>{comment.content}</CommentContent>
        <CommentActions>
          <ActionButton onClick={() => setShowReplyForm(!showReplyForm)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 10 20 15 15 20"></polyline>
              <path d="M4 4v7a4 4 0 0 0 4 4h12"></path>
            </svg>
            답글
          </ActionButton>
          <ActionButton>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            좋아요 {comment.likes}
          </ActionButton>
        </CommentActions>
        
        {showReplyForm && (
          <ReplyContainer>
            <CommentForm
              postId={postId}
              parentId={comment.id}
              onSubmit={async () => {
                // 답글 작성 로직 (CommentList 컴포넌트에서 구현)
                setShowReplyForm(false);
              }}
              isSubmitting={false}
            />
          </ReplyContainer>
        )}
      </CommentContainer>
      
      {comment.replies && comment.replies.map(reply => (
        <CommentItem key={reply.id} comment={reply} postId={postId} />
      ))}
    </>
  );
};
