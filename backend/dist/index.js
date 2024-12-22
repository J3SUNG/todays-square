"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes")); // routes/index.ts를 가져오기
const app = (0, express_1.default)();
app.use(express_1.default.json());
// API 라우트 연결
app.use("/api", routes_1.default);
// 기본 라우트
app.get("/", (req, res) => {
    res.send("Hello, world!");
});
// 서버 실행
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
