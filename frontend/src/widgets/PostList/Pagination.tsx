import React from 'react';
import styled from '@emotion/styled';
import { Button } from '../../shared/ui';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 24px 0;
  gap: 8px;
`;

const PageNumber = styled.button<{ isActive: boolean }>`
  min-width: 32px;
  height: 32px;
  padding: 0 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  background-color: ${props => props.isActive ? '#4a6cf7' : 'transparent'};
  color: ${props => props.isActive ? 'white' : '#333'};
  border: ${props => props.isActive ? 'none' : '1px solid #ddd'};
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.isActive ? '#4a6cf7' : '#f1f3f5'};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange
}) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    
    // 시작 페이지와 종료 페이지 계산
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    
    // startPage 조정
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    
    // 페이지 번호 추가
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <PageNumber 
          key={i} 
          isActive={i === currentPage}
          onClick={() => onPageChange(i)}
          disabled={i === currentPage}
        >
          {i}
        </PageNumber>
      );
    }
    
    return pageNumbers;
  };
  
  return (
    <PaginationContainer>
      <Button
        variant="outline"
        size="small"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        이전
      </Button>
      
      {renderPageNumbers()}
      
      <Button
        variant="outline"
        size="small"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        다음
      </Button>
    </PaginationContainer>
  );
};
