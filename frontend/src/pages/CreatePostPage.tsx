import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { PostForm, usePosts } from '../features/posts';

// 스타일 컴포넌트
const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const PageHeader = styled.div`
  margin-bottom: 20px;
`;

const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #333;
`;

const FormContainer = styled.div`
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
    } catch (error) {
      // 에러 처리는 context에서 처리됨
    }
  };
  
  const handleCancel = () => {
    navigate(-1);
  };
  
  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>새 게시물 작성</PageTitle>
      </PageHeader>
      
      <FormContainer>
        <PostForm
          onSubmit={handleSubmit}
          isSubmitting={isLoading}
          onCancel={handleCancel}
        />
      </FormContainer>
    </PageContainer>
  );
};
