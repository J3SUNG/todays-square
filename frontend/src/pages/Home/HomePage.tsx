import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../shared/ui';
import { PostList } from '../../widgets/PostList';
import { usePostsStore } from '../../entities/post';
import {
  HomeContainer,
  HeroSection,
  HeroTitle,
  HeroSubtitle,
  ContentSection,
  SectionTitle
} from './HomePage.styles';

export const HomePage: React.FC = () => {
  const { setFilters } = usePostsStore();
  
  // 컴포넌트 마운트 시 필터 초기화
  useEffect(() => {
    setFilters({
      sortBy: 'latest',
      page: 1,
      limit: 5 // 홈 페이지에서는 최근 5개만 표시
    });
    
    return () => {
      // 컴포넌트 언마운트 시 사용자가 원래 설정한 필터로 복원
      setFilters({
        sortBy: 'latest',
        page: 1,
        limit: 10
      });
    };
  }, [setFilters]); // setFilters를 종속성 배열에 추가
  
  return (
    <HomeContainer>
      <HeroSection>
        <HeroTitle>오늘의 광장에 오신 것을 환영합니다</HeroTitle>
        <HeroSubtitle>
          사람들과 생각을 나누고, 정보를 공유하고, 새로운 친구를 만나보세요.
          오늘의 광장은 여러분의 아이디어와 경험이 빛나는 공간입니다.
        </HeroSubtitle>
        <Link to="/posts/create">
          <Button variant="primary">글 작성하기</Button>
        </Link>
      </HeroSection>
      
      <ContentSection>
        <SectionTitle>최신 게시물</SectionTitle>
        <PostList />
      </ContentSection>
    </HomeContainer>
  );
};

export default HomePage;
