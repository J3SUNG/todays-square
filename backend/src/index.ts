import express from "express";
import routes from "./routes"; // routes/index.ts를 가져오기

const app = express();

app.use(express.json());

// API 라우트 연결
app.use("/api", routes);

// 기본 라우트
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// 서버 실행
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
