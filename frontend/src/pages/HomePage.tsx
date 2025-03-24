import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { PostList, usePosts } from '../features/posts';
import { useAuth } from '../features/auth';

// 스타일 컴포넌트
const Container = styled.div`
  width: 100%;
`;

const HeroSection = styled.section`
  text-align: center;
  margin-bottom: 48px;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #333;
`;

const SubTitle = styled.p`
  font-size: 18px;
  color: #666;
  max-width: 600px;
  margin: 0 auto 24px;
  line-height: 1.5;
`;

const Button = styled.button`
  padding: 12px 24px;
  background-color: #4a6cf7;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  
  &:hover {
    background-color: #3a5cf7;
  }
`;

const Section = styled.section`
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 24px;
  color: #333;
`;

export const HomePage: React.FC = () => {
  const { setFilter } = usePosts();
  const { isLoggedIn } = useAuth();
  
  // 홈페이지에서는 최신 게시물 5개만 표시
  useEffect(() => {
    setFilter({
      page: 1,
      limit: 5,
      sortBy: 'latest',
    });
    
    // 컴포넌트 언마운트 시 필터 초기화
    return () => {
      setFilter({
        page: 1,
        limit: 10,
        sortBy: 'latest',
      });
    };
  }, []);
  
  return (
    <Container>
      <HeroSection>
        <Title>오늘의 광장에 오신 것을 환영합니다</Title>
        <SubTitle>
          다양한 주제에 대해 이야기하고, 지식을 공유하고, 새로운 사람들과 소통하세요.
          오늘의 광장은 여러분의 생각과 경험이 모이는 공간입니다.
        </SubTitle>
        
        {isLoggedIn ? (
          <Link to="/posts/create">
            <Button>글 작성하기</Button>
          </Link>
        ) : (
          <Link to="/login">
            <Button>시작하기</Button>
          </Link>
        )}
      </HeroSection>
      
      <Section>
        <SectionTitle>최신 게시물</SectionTitle>
        <PostList />
      </Section>
    </Container>
  );
};
