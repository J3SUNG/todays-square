import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Link, useNavigate } from 'react-router-dom';
import { usePostsStore } from '../../entities/post';
import { usePostLoader, useDeletePostHandler, useLikePostHandler } from '../../features/post';
import { useAuthStore } from '../../features/auth';
import { formatDate } from '../../shared/lib/helpers';
import { Button, Card } from '../../shared/ui';

interface PostDetailProps {
  postId: string;
}

const DetailContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const PostHeader = styled.div`
  margin-bottom: 24px;
`;

const PostTitle = styled.h1`
  font-size: 28px;
  margin-bottom: 8px;
  color: #333;
`;

const PostMeta = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
`;

const PostAuthor = styled.span`
  font-weight: 500;
`;

const PostContent = styled.div`
  font-size: 16px;
  line-height: 1.6;
  color: #333;
  margin-bottom: 32px;
  white-space: pre-line;
`;

const PostActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
  border-top: 1px solid #eee;
  padding-top: 16px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
`;

const LikeButton = styled.button<{ buttonTheme?: 'liked' | 'default' }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: ${props => props.buttonTheme === 'liked' ? '#f8e6e6' : '#f8f9fa'};
  color: ${props => props.buttonTheme === 'liked' ? '#e74c3c' : '#666'};
  border: 1px solid ${props => props.buttonTheme === 'liked' ? '#e74c3c' : '#ddd'};
  border-radius: 4px;
  cursor: pointer;
  
  svg {
    transition: transform 0.3s ease;
  }
  
  &:hover svg {
    transform: scale(1.1);
  }
`;

export const PostDetail: React.FC<PostDetailProps> = ({ postId }) => {
  const navigate = useNavigate();
  const { currentPost, loading, error } = usePostsStore();
  const loadPost = usePostLoader();
  const { deletePost, isDeleting } = useDeletePostHandler();
  const likePost = useLikePostHandler();
  const [liked, setLiked] = useState(false);
  const { user, isLoggedIn } = useAuthStore();
  
  useEffect(() => {
    loadPost(postId);
  }, [postId, loadPost]);
  
  const handleDelete = async () => {
    if (window.confirm('정말로 이 게시물을 삭제하시겠습니까?')) {
      const success = await deletePost(postId);
      if (success) {
        navigate('/');
      }
    }
  };
  
  const handleLike = async () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    
    try {
      await likePost(postId);
      setLiked(!liked);
    } catch (error) {
      console.error('게시글 좋아요 처리 오류:', error);
      // 에러 처리는 likePost 핸들러 내부에서 수행
    }
  };
  
  if (loading) {
    return (
      <DetailContainer>
        <Card>
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            게시물을 불러오는 중...
          </div>
        </Card>
      </DetailContainer>
    );
  }
  
  if (error || !currentPost) {
    return (
      <DetailContainer>
        <Card>
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            게시물을 찾을 수 없습니다.
          </div>
        </Card>
      </DetailContainer>
    );
  }
  
  const isAuthor = user && user.id === currentPost.authorId;
  
  return (
    <DetailContainer>
      <Card>
        <div style={{ padding: '20px' }}>
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
            <LikeButton onClick={handleLike} buttonTheme={liked ? 'liked' : 'default'}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              좋아요 {currentPost.likes}
            </LikeButton>
            
            {isAuthor && (
              <ActionButtons>
                <Link to={`/posts/${postId}/edit`}>
                  <Button variant="outline" size="small">수정</Button>
                </Link>
                <Button 
                  variant="danger" 
                  size="small" 
                  onClick={handleDelete}
                  isLoading={isDeleting}
                  disabled={isDeleting}
                >
                  삭제
                </Button>
              </ActionButtons>
            )}
          </PostActions>
        </div>
      </Card>
    </DetailContainer>
  );
};
