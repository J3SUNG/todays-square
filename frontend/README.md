# Frontend - 오늘의 네모

## 기술 스택

- **Vite**: ^6.0.3
- **React**: ^18.3.1
- **TypeScript**: ~5.6.2
- **Emotion**: ^11.14.0
- **플러그인**: @vitejs/plugin-react-swc

## 초기화 명령어

```bash
npm create vite@latest my-app --template react-ts
npm install @emotion/react @emotion/styled
```

## 폴더 구조 (FSD 아키텍쳐)

📦 frontend  
┣ 📂 src  
┃ ┣ 📂 app # 앱 전체 설정 (라우팅, 진입점, 전역 스타일, 프로바이더)  
┃ ┣ 📂 pages # 전체 페이지 또는 중첩 라우팅에서 페이지의 주요 부분  
┃ ┣ 📂 widgets # 독립적으로 작동하는 대규모 기능 또는 UI 컴포넌트  
┃ ┣ 📂 features # 제품 전반에 걸쳐 재사용되는 기능 구현체  
┃ ┣ 📂 entities # 비즈니스 엔티티 (예: user 또는 product)  
┃ ┣ 📂 shared # 프로젝트 전반에서 재사용 가능한 공통 코드  
┃ ┗ 📜 index.tsx # React 애플리케이션의 진입점
