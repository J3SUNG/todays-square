import express from "express";
import { exampleHandler } from "../controllers/exampleController";

const router = express.Router();

// 라우트 설정
router.get("/example", exampleHandler);

export default router;
