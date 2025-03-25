import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Link, useNavigate } from 'react-router-dom';
import { usePosts } from '../context/PostsContext';
import { useAuth } from '../../auth';

// 날짜 포맷 함수
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

// 스타일 컴포넌트
const DetailContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 24px;
`;

const PostHeader = styled.div`
  margin-bottom: 24px;
`;

const PostTitle = styled.h1`
  font-size: 28px;
  margin-bottom: 12px;
  color: #333;
`;

const PostMeta = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #666;
  margin-bottom: 24px;
`;

const PostAuthor = styled.span`
  font-weight: 500;
`;

const PostContent = styled.div`
  font-size: 16px;
  line-height: 1.7;
  color: #333;
  margin-bottom: 32px;
  white-space: pre-line;
`;

const PostActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #eee;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' | 'danger' }>`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  
  background-color: ${props => {
    if (props.variant === 'primary') return '#4a6cf7';
    if (props.variant === 'danger') return '#dc3545';
    return '#6c757d';
  }};
  
  color: white;
  margin-left: 8px;
  
  &:hover {
    background-color: ${props => {
      if (props.variant === 'primary') return '#3a5cf7';
      if (props.variant === 'danger') return '#c82333';
      return '#5c656d';
    }};
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const LikeButton = styled.button<{ isLiked: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: ${props => props.isLiked ? '#f8e6e6' : '#f8f9fa'};
  color: ${props => props.isLiked ? '#e74c3c' : '#666'};
  border: 1px solid ${props => props.isLiked ? '#e74c3c' : '#ddd'};
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  
  & > svg {
    transition: transform 0.3s ease;
  }
  
  &:hover > svg {
    transform: scale(1.1);
  }
`;

const ActionButtons = styled.div`
  display: flex;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  
  &:after {
    content: "";
    width: 32px;
    height: 32px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #4a6cf7;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorDisplay = styled.div`
  text-align: center;
  padding: 40px 0;
  color: #dc3545;
`;

// Props 타입 정의
type PostDetailProps = {
  postId: string;
};

export const PostDetail: React.FC<PostDetailProps> = ({ postId }) => {
  const navigate = useNavigate();
  const { currentPost, isLoading, error, fetchPost, deletePost, likePost } = usePosts();
  const { user, isLoggedIn } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // 게시물 데이터 로드
  useEffect(() => {
    fetchPost(postId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);
  
  // 게시물 삭제 핸들러
  const handleDelete = async () => {
    if (!window.confirm('정말로 이 게시물을 삭제하시겠습니까?')) {
      return;
    }
    
    setIsDeleting(true);
    const success = await deletePost(postId);
    setIsDeleting(false);
    
    if (success) {
      navigate('/');
    }
  };
  
  // 좋아요 핸들러
  const handleLike = async () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    
    try {
      await likePost(postId);
      setIsLiked(!isLiked);
    } catch {
      // 에러 처리는 context에서 처리됨
    }
  };
  
  if (isLoading) {
    return (
      <DetailContainer>
        <LoadingSpinner />
      </DetailContainer>
    );
  }
  
  if (error || !currentPost) {
    return (
      <DetailContainer>
        <ErrorDisplay>
          {error || '게시물을 찾을 수 없습니다.'}
        </ErrorDisplay>
      </DetailContainer>
    );
  }
  
  const isAuthor = user && user.id === currentPost.authorId;
  
  return (
    <DetailContainer>
      <PostHeader>
        <PostTitle>{currentPost.title}</PostTitle>
        <PostMeta>
          <div>
            <PostAuthor>{currentPost.authorName}</PostAuthor> • {formatDate(currentPost.createdAt)}
          </div>
          {currentPost.updatedAt !== currentPost.createdAt && (
            <span>수정됨: {formatDate(currentPost.updatedAt)}</span>
          )}
        </PostMeta>
      </PostHeader>
      
      <PostContent>{currentPost.content}</PostContent>
      
      <PostActions>
        <LikeButton onClick={handleLike} isLiked={isLiked}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
          좋아요 {currentPost.likes}
        </LikeButton>
        
        {isAuthor && (
          <ActionButtons>
            <Link to={`/posts/${postId}/edit`}>
              <Button variant="secondary">수정</Button>
            </Link>
            <Button 
              variant="danger" 
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? '삭제 중...' : '삭제'}
            </Button>
          </ActionButtons>
        )}
      </PostActions>
    </DetailContainer>
  );
};
