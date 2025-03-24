import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { usePostsStore, PostSortOption } from '../../entities/post';
import { usePostsLoader } from '../../features/post';
import { PostListItem } from './PostListItem';
import { Pagination } from './Pagination';
import { Button, Card } from '../../shared/ui';
import { Link } from 'react-router-dom';

const ListContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const SortOptions = styled.div`
  display: flex;
  gap: 12px;
`;

const SortButton = styled.button<{ isActive: boolean }>`
  background: none;
  border: none;
  padding: 4px 8px;
  font-size: 14px;
  cursor: pointer;
  color: ${props => props.isActive ? '#4a6cf7' : '#666'};
  font-weight: ${props => props.isActive ? '600' : '400'};
  border-bottom: ${props => props.isActive ? '2px solid #4a6cf7' : 'none'};
  
  &:hover {
    color: #4a6cf7;
  }
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 48px 0;
  color: #666;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 48px 0;
  color: #666;
`;

interface PostListProps {
  authorId?: string;
}

export const PostList: React.FC<PostListProps> = ({ authorId }) => {
  const { 
    posts, 
    loading, 
    error, 
    filters, 
    totalPosts, 
    setFilters 
  } = usePostsStore();
  const loadPosts = usePostsLoader();
  
  const totalPages = Math.ceil(totalPosts / filters.limit);
  
  useEffect(() => {
    loadPosts({ authorId });
  }, [filters.page, filters.sortBy, authorId]);
  
  const handleSortChange = (sortBy: PostSortOption) => {
    setFilters({ sortBy, page: 1 });
  };
  
  const handlePageChange = (page: number) => {
    setFilters({ page });
  };
  
  if (error) {
    return (
      <Card>
        <EmptyMessage>
          데이터를 불러오는 중 오류가 발생했습니다: {error}
        </EmptyMessage>
      </Card>
    );
  }
  
  return (
    <ListContainer>
      <ListHeader>
        <SortOptions>
          <SortButton
            isActive={filters.sortBy === 'latest'}
            onClick={() => handleSortChange('latest')}
          >
            최신순
          </SortButton>
          <SortButton
            isActive={filters.sortBy === 'popular'}
            onClick={() => handleSortChange('popular')}
          >
            인기순
          </SortButton>
          <SortButton
            isActive={filters.sortBy === 'comments'}
            onClick={() => handleSortChange('comments')}
          >
            댓글순
          </SortButton>
        </SortOptions>
        
        <Link to="/posts/create">
          <Button variant="primary" size="small">글 작성하기</Button>
        </Link>
      </ListHeader>
      
      <Card>
        {loading ? (
          <LoadingMessage>게시물을 불러오는 중...</LoadingMessage>
        ) : posts.length === 0 ? (
          <EmptyMessage>게시물이 없습니다.</EmptyMessage>
        ) : (
          <>
            {posts.map((post) => (
              <PostListItem key={post.id} post={post} />
            ))}
          </>
        )}
      </Card>
      
      {totalPages > 1 && (
        <Pagination
          currentPage={filters.page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </ListContainer>
  );
};
