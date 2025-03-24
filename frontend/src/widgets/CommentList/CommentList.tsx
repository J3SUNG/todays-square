import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useCommentsStore } from '../../entities/comment';
import { useCommentsLoader, useCreateCommentHandler, CommentForm } from '../../features/comment';
import { CommentItem } from './CommentItem';
import { Card } from '../../shared/ui';
import { useAuthStore } from '../../features/auth';
import { useNavigate } from 'react-router-dom';

interface CommentListProps {
  postId: string;
}

const ListContainer = styled.div`
  max-width: 800px;
  margin: 20px auto;
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #eee;
`;

const CommentCount = styled.h3`
  margin: 0;
  font-size: 16px;
  color: #333;
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 32px 0;
  color: #666;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 32px 0;
  color: #666;
`;

export const CommentList: React.FC<CommentListProps> = ({ postId }) => {
  const navigate = useNavigate();
  const { comments, loading, error } = useCommentsStore();
  const loadComments = useCommentsLoader();
  const { createComment, isSubmitting } = useCreateCommentHandler();
  const { isLoggedIn } = useAuthStore();
  
  useEffect(() => {
    loadComments(postId);
  }, [postId]);
  
  const handleCommentSubmit = async (content: string) => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    
    await createComment({
      content,
      postId
    });
  };
  
  if (error) {
    return (
      <ListContainer>
        <Card>
          <EmptyMessage>
            댓글을 불러오는 중 오류가 발생했습니다: {error}
          </EmptyMessage>
        </Card>
      </ListContainer>
    );
  }
  
  // 최상위 댓글만 필터링 (답글은 별도로 표시)
  const rootComments = comments.filter(comment => !comment.parentId);
  
  return (
    <ListContainer>
      <Card>
        <CommentHeader>
          <CommentCount>댓글 {comments.length}개</CommentCount>
        </CommentHeader>
        
        {isLoggedIn && (
          <div style={{ padding: '16px' }}>
            <CommentForm
              postId={postId}
              onSubmit={handleCommentSubmit}
              isSubmitting={isSubmitting}
            />
          </div>
        )}
        
        {loading ? (
          <LoadingMessage>댓글을 불러오는 중...</LoadingMessage>
        ) : comments.length === 0 ? (
          <EmptyMessage>아직 댓글이 없습니다. 첫 댓글을 작성해보세요!</EmptyMessage>
        ) : (
          <>
            {rootComments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} postId={postId} />
            ))}
          </>
        )}
      </Card>
    </ListContainer>
  );
};
