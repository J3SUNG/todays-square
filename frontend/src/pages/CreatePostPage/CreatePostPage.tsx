import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PostForm, useCreatePostHandler } from '../../features/post';
import { Card } from '../../shared/ui';
import styled from '@emotion/styled';

const PageContainer = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 0 20px;
`;

const PageTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 24px;
  color: #333;
`;

export const CreatePostPage: React.FC = () => {
  const navigate = useNavigate();
  const { createPost, isSubmitting } = useCreatePostHandler();
  
  const handleSubmit = async (data: { title: string; content: string }) => {
    try {
      const newPost = await createPost(data);
      navigate(`/posts/${newPost.id}`);
    } catch (error) {
      // 에러 처리는 createPost 핸들러 내부에서 수행
    }
  };
  
  return (
    <PageContainer>
      <PageTitle>새 게시물 작성</PageTitle>
      <Card>
        <div style={{ padding: '20px' }}>
          <PostForm
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
      </Card>
    </PageContainer>
  );
};

export default CreatePostPage;
