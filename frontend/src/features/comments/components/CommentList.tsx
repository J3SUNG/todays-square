import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useComments } from '../context/CommentsContext';
import { useAuth } from '../../auth';
import { CommentItem } from './CommentItem';
import { CommentForm } from './CommentForm';

// 스타일 컴포넌트
const ListContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-top: 24px;
`;

const ListHeader = styled.div`
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

const FormContainer = styled.div`
  padding: 16px;
  border-bottom: 1px solid #eee;
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 32px 0;
  color: #666;
`;

const LoginPrompt = styled.div`
  text-align: center;
  padding: 16px;
  color: #666;
  font-size: 14px;
  
  a {
    color: #4a6cf7;
    text-decoration: none;
    font-weight: 500;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32px 0;
  
  &:after {
    content: "";
    width: 24px;
    height: 24px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid #4a6cf7;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Props 타입 정의
type CommentListProps = {
  postId: string;
};

export const CommentList: React.FC<CommentListProps> = ({ postId }) => {
  const { comments, isLoading, error, fetchComments } = useComments();
  const { isLoggedIn } = useAuth();
  
  // 댓글 데이터 로드
  useEffect(() => {
    fetchComments(postId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);
  
  return (
    <ListContainer>
      <ListHeader>
        <CommentCount>댓글 {comments.length}개</CommentCount>
      </ListHeader>
      
      {isLoggedIn ? (
        <FormContainer>
          <CommentForm postId={postId} />
        </FormContainer>
      ) : (
        <LoginPrompt>
          댓글을 작성하려면 <a href="/login">로그인</a>이 필요합니다.
        </LoginPrompt>
      )}
      
      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <EmptyMessage>
          댓글을 불러오는 중 오류가 발생했습니다: {error}
        </EmptyMessage>
      ) : comments.length === 0 ? (
        <EmptyMessage>
          아직 댓글이 없습니다. 첫 댓글을 작성해보세요!
        </EmptyMessage>
      ) : (
        comments.map(comment => (
          <CommentItem
            key={comment.id}
            comment={comment}
            postId={postId}
          />
        ))
      )}
    </ListContainer>
  );
};
