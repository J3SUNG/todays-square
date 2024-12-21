# Frontend - 오늘의 네모

## 기술 스택

- **Node.js**: v22.12.0
- **Express**: ^4.18.2
- **TypeScript**: ~5.6.2
- **MySQL2**: ^3.2.0
- **dotenv**: ^16.3.1
- **cors**: ^2.8.5

## 초기화 명령어

```bash
npm init -y
npm install express mysql2 dotenv cors
npm install --save-dev typescript @types/express @types/node
```

## 폴더 구조 (계층형 아키텍처)

📦 backend  
┣ 📂 src  
┃ ┣ 📂 config # 환경 설정 (DB, 서버 설정 등)  
┃ ┣ 📂 controllers # HTTP 요청/응답 처리  
┃ ┣ 📂 services # 비즈니스 로직 처리  
┃ ┣ 📂 models # 데이터베이스 모델  
┃ ┣ 📂 routes # 라우팅 설정  
┃ ┣ 📂 middlewares # 미들웨어  
┃ ┣ 📜 db.ts # DB 연결 설정  
┃ ┗ 📜 index.ts # 서버 진입점
