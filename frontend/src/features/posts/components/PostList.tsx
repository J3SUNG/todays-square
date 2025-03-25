import React from 'react';
import styled from '@emotion/styled';
import { usePosts } from '../context/PostsContext';
import { PostItem } from './PostItem';

// 스타일 컴포넌트
const ListContainer = styled.div`
  width: 100%;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #eee;
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

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
  gap: 8px;
`;

const PageButton = styled.button<{ isActive?: boolean }>`
  min-width: 32px;
  height: 32px;
  padding: 0 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-size: 14px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  background-color: ${props => props.isActive ? '#4a6cf7' : '#fff'};
  color: ${props => props.isActive ? 'white' : '#333'};
  border: ${props => props.isActive ? 'none' : '1px solid #ddd'};
  opacity: ${props => props.disabled ? 0.5 : 1};
  
  &:hover:not(:disabled) {
    background-color: ${props => props.isActive ? '#4a6cf7' : '#f1f3f5'};
  }
`;

// Props 타입 정의
type PostListProps = {
  authorId?: string;
};

export const PostList: React.FC<PostListProps> = ({ authorId }) => {
  const { 
    posts, 
    isLoading, 
    error, 
    filter, 
    totalPosts, 
    setFilter, 
    fetchPosts 
  } = usePosts();
  
  // 필터 업데이트 함수
  React.useEffect(() => {
    if (authorId) {
      fetchPosts({ authorId, page: 1 });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authorId]);
  
  // 정렬 옵션 변경 핸들러
  const handleSortChange = (sortBy: 'latest' | 'popular' | 'comments') => {
    setFilter({ sortBy, page: 1 });
  };
  
  // 페이지 이동 핸들러
  const handlePageChange = (page: number) => {
    setFilter({ page });
  };
  
  // 총 페이지 수 계산
  const totalPages = Math.ceil(totalPosts / filter.limit);
  
  // 페이지네이션 렌더링
  const renderPagination = () => {
    if (totalPages <= 1) return null;
    
    const pages = [];
    const maxPagesToShow = 5;
    const startPage = Math.max(1, filter.page - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    
    // 이전 페이지 버튼
    pages.push(
      <PageButton 
        key="prev" 
        onClick={() => handlePageChange(filter.page - 1)}
        disabled={filter.page === 1}
      >
        이전
      </PageButton>
    );
    
    // 페이지 번호 버튼
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PageButton 
          key={i} 
          isActive={i === filter.page}
          onClick={() => handlePageChange(i)}
          disabled={i === filter.page}
        >
          {i}
        </PageButton>
      );
    }
    
    // 다음 페이지 버튼
    pages.push(
      <PageButton 
        key="next" 
        onClick={() => handlePageChange(filter.page + 1)}
        disabled={filter.page === totalPages}
      >
        다음
      </PageButton>
    );
    
    return <Pagination>{pages}</Pagination>;
  };
  
  if (error) {
    return (
      <ListContainer>
        <EmptyMessage>
          데이터를 불러오는 중 오류가 발생했습니다: {error}
        </EmptyMessage>
      </ListContainer>
    );
  }
  
  return (
    <>
      <ListContainer>
        <ListHeader>
          <SortOptions>
            <SortButton
              isActive={filter.sortBy === 'latest'}
              onClick={() => handleSortChange('latest')}
            >
              최신순
            </SortButton>
            <SortButton
              isActive={filter.sortBy === 'popular'}
              onClick={() => handleSortChange('popular')}
            >
              인기순
            </SortButton>
            <SortButton
              isActive={filter.sortBy === 'comments'}
              onClick={() => handleSortChange('comments')}
            >
              댓글순
            </SortButton>
          </SortOptions>
        </ListHeader>
        
        {isLoading ? (
          <LoadingMessage>게시물을 불러오는 중...</LoadingMessage>
        ) : posts.length === 0 ? (
          <EmptyMessage>게시물이 없습니다.</EmptyMessage>
        ) : (
          posts.map(post => <PostItem key={post.id} post={post} />)
        )}
      </ListContainer>
      
      {renderPagination()}
    </>
  );
};
