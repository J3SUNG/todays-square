"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use(express_1.default.json());
app.use("/api", routes_1.default);
app.get("/", (req, res) => {
    res.send("Hello, world!");
});
app.post("/login", (req, res) => {
    console.log(req.body, "REQ");
    const { email, password } = req.body;
    if (email === "1234@co.kr" && password === "1234") {
        res.send({ success: true, message: "로그인 성공" });
    }
    else {
        res.status(401).send({ success: false, message: "로그인 실패" });
    }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
