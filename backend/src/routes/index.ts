import { Router } from "express";
import usersRouter from "./users"; // 정확한 상대 경로 확인

const router = Router();

// Users API 연결
router.use("/users", usersRouter);

export default router;
