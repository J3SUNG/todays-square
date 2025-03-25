import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { PostForm, usePosts, PostFormData } from '../features/posts';

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

const LoadingMessage = styled.div`
  text-align: center;
  padding: 40px 0;
  color: #666;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 40px 0;
  color: #dc3545;
`;

export const EditPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentPost, fetchPost, updatePost, isLoading, error } = usePosts();
  const [initialData, setInitialData] = useState<PostFormData | null>(null);
  
  useEffect(() => {
    if (id) {
      fetchPost(id);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  
  useEffect(() => {
    if (currentPost) {
      setInitialData({
        title: currentPost.title,
        content: currentPost.content,
      });
    }
  }, [currentPost]);
  
  const handleSubmit = async (data: PostFormData) => {
    if (!id) return;
    
    try {
      const updatedPost = await updatePost(id, data);
      navigate(`/posts/${updatedPost.id}`);
    } catch (error) {
      console.error('게시물 업데이트 오류:', error);
      // 에러 처리는 context에서 처리됨
    }
  };
  
  const handleCancel = () => {
    navigate(-1);
  };
  
  if (isLoading || !initialData) {
    return <LoadingMessage>게시물을 불러오는 중...</LoadingMessage>;
  }
  
  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }
  
  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>게시물 수정</PageTitle>
      </PageHeader>
      
      <FormContainer>
        <PostForm
          initialData={initialData}
          onSubmit={handleSubmit}
          isSubmitting={isLoading}
          onCancel={handleCancel}
        />
      </FormContainer>
    </PageContainer>
  );
};
