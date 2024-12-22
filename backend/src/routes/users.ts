import { Router } from "express";
import { db } from "../db"; // DB 연결 설정 가져오기

const router = Router();

// Users 테이블 데이터 조회
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM Users");
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error("DB Query Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch users" });
  }
});

export default router;
