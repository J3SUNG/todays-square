import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { Post } from '../context/PostsContext';

// 날짜 포맷 함수
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

// 텍스트 길이 제한 함수
const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};

// 스타일 컴포넌트
const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const PostItemContainer = styled.div`
  padding: 16px;
  border-bottom: 1px solid #eee;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #f8f9fa;
  }
`;

const PostTitle = styled.h3`
  margin: 0 0 8px;
  font-size: 18px;
  color: #333;
`;

const PostContent = styled.p`
  margin: 0 0 12px;
  color: #666;
  font-size: 14px;
  line-height: 1.5;
`;

const PostMetadata = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #888;
`;

const PostAuthor = styled.span`
  font-weight: 500;
`;

const PostStats = styled.div`
  display: flex;
  gap: 12px;
`;

const PostStat = styled.span`
  display: flex;
  align-items: center;
  
  & > svg {
    margin-right: 4px;
  }
`;

// Props 타입 정의
type PostItemProps = {
  post: Post;
};

export const PostItem: React.FC<PostItemProps> = ({ post }) => {
  return (
    <StyledLink to={`/posts/${post.id}`}>
      <PostItemContainer>
        <PostTitle>{post.title}</PostTitle>
        <PostContent>{truncateText(post.content, 150)}</PostContent>
        <PostMetadata>
          <div>
            <PostAuthor>{post.authorName}</PostAuthor> • {formatDate(post.createdAt)}
          </div>
          <PostStats>
            <PostStat>
              {/* 댓글 아이콘 */}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
              {post.commentsCount}
            </PostStat>
            <PostStat>
              {/* 좋아요 아이콘 */}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              {post.likes}
            </PostStat>
          </PostStats>
        </PostMetadata>
      </PostItemContainer>
    </StyledLink>
  );
};
