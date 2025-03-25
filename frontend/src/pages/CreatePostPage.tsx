import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PostForm, usePosts } from '../features/posts';
import styled from '@emotion/styled';

// 스타일 컴포넌트
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

const FormWrapper = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 24px;
`;

export const CreatePostPage: React.FC = () => {
  const navigate = useNavigate();
  const { createPost, isLoading } = usePosts();
  
  const handleSubmit = async (data: { title: string; content: string }) => {
    try {
      const newPost = await createPost(data);
      navigate(`/posts/${newPost.id}`);
    } catch {
      // 에러 처리는 context에서 처리됨
    }
  };
  
  const handleCancel = () => {
    navigate('/');
  };
  
  return (
    <PageContainer>
      <PageTitle>새 게시물 작성</PageTitle>
      <FormWrapper>
        <PostForm
          onSubmit={handleSubmit}
          isSubmitting={isLoading}
          onCancel={handleCancel}
        />
      </FormWrapper>
    </PageContainer>
  );
};
