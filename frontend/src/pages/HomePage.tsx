import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
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

const GameContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 24px;
  text-align: center;
`;

const GameHeading = styled.h2`
  font-size: 24px;
  margin-bottom: 16px;
  color: #333;
`;

const GameDescription = styled.p`
  margin-bottom: 24px;
  color: #666;
`;

export const HomePage: React.FC = () => {
  const { isLoggedIn } = useAuth();
  
  return (
    <Container>
      <HeroSection>
        <Title>오늘의 네모</Title>
        <SubTitle>
          매일 새로운 노노그램 퍼즐을 풀어보세요. 논리적 사고와 집중력을 키울 수 있는 
          재미있는 퍼즐 게임을 하루에 한 번 제공합니다.
        </SubTitle>
        
        {isLoggedIn ? (
          <Link to="/game">
            <Button>오늘의 퍼즐 풀기</Button>
          </Link>
        ) : (
          <Link to="/login">
            <Button>시작하기</Button>
          </Link>
        )}
      </HeroSection>
      
      <GameContainer>
        <GameHeading>오늘의 네모란?</GameHeading>
        <GameDescription>
          노노그램(네모로직)은 숫자 힌트를 사용해 그림을 완성하는 퍼즐 게임입니다.
          매일 새로운 퍼즐이 제공되며, 퍼즐을 풀면 귀여운 픽셀 아트를 발견할 수 있습니다.
          회원가입 후 매일 퍼즐을 풀고 랭킹에 도전해보세요!
        </GameDescription>
        <img 
          src="/sample-nonogram.png" 
          alt="노노그램 예시" 
          style={{ maxWidth: '100%', borderRadius: '4px', marginBottom: '16px' }}
        />
      </GameContainer>
    </Container>
  );
};
