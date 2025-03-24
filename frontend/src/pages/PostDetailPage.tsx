import React from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { PostDetail } from '../features/posts';
import { CommentList } from '../features/comments';

// 스타일 컴포넌트
const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

export const PostDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  if (!id) {
    return (
      <PageContainer>
        <div>게시물을 찾을 수 없습니다.</div>
      </PageContainer>
    );
  }
  
  return (
    <PageContainer>
      <PostDetail postId={id} />
      <CommentList postId={id} />
    </PageContainer>
  );
};
