"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = __importDefault(require("./users")); // 정확한 상대 경로 확인
const router = (0, express_1.Router)();
// Users API 연결
router.use("/users", users_1.default);
exports.default = router;
