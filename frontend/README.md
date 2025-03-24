# 오늘의 광장 (Today's Square)

이 프로젝트는 게시판 웹 애플리케이션으로, 사용자들이 글을 작성하고 댓글을 달 수 있는 커뮤니티 플랫폼입니다.

## 기술 스택

- **프레임워크**: React
- **언어**: TypeScript
- **상태 관리**: Context API
- **스타일링**: Emotion
- **HTTP 클라이언트**: Axios
- **라우팅**: React Router v7

## 기능

- **사용자 인증**: 로그인/로그아웃, 회원가입
- **게시판**: 게시물 목록, 상세 보기, 작성, 수정, 삭제
- **댓글**: 댓글 작성, 수정, 삭제, 답글
- **좋아요**: 게시물 및 댓글 좋아요 기능

## 프로젝트 구조

프로젝트는 기능 중심의 구조로 설계되었으며, 관련 컴포넌트와 로직이 함께 그룹화되어 있습니다.

```
frontend/
├── src/
│   ├── components/        # 공통 컴포넌트
│   │   └── shared/        # 레이아웃, 헤더 등 공통 UI
│   ├── features/          # 기능별 모듈
│   │   ├── auth/          # 인증 관련 기능
│   │   ├── posts/         # 게시물 관련 기능
│   │   └── comments/      # 댓글 관련 기능
│   ├── pages/             # 페이지 컴포넌트
│   ├── shared/            # 공유 유틸리티 및 설정
│   │   ├── config/        # 설정 파일
│   │   └── lib/           # 유틸리티 함수 
│   ├── App.tsx            # 루트 컴포넌트
│   └── main.tsx           # 엔트리 포인트
```

## React 컴포넌트 패턴

이 프로젝트에서는 다음과 같은 React 패턴을 사용했습니다:

1. **Context API를 활용한 상태 관리**
   - 기능별로 분리된 상태 관리 (auth, posts, comments)
   - Custom Hook을 통한 상태 접근

2. **컴포넌트 합성**
   - 작은 단위의 컴포넌트를 조합하여 복잡한 UI 구성
   - 관심사 분리를 통한 유지보수성 향상

3. **선언적 UI 패턴**
   - 상태에 따른 UI 렌더링 로직을 명확하게 분리
   - 조건부 렌더링을 활용한 UI 상태 처리

4. **Hooks 패턴**
   - useState, useEffect, useContext 등 React Hooks 활용
   - Custom Hooks로 로직 재사용성 확보

## 실행 방법

1. 패키지 설치
   ```bash
   npm install
   ```

2. 개발 서버 실행
   ```bash
   npm run dev
   ```

3. 빌드
   ```bash
   npm run build
   ```
