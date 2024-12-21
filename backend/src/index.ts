import express from "express";
import routes from "./routes";

const app = express();

app.use(express.json());

// 기본 API 라우트 연결
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
