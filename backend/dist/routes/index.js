"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const exampleController_1 = require("../controllers/exampleController");
const router = express_1.default.Router();
// 라우트 설정
router.get("/example", exampleController_1.exampleHandler);
exports.default = router;
