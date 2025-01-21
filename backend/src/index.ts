import express from "express";
import routes from "./routes";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.post("/login", (req, res) => {
  console.log(req.body, "REQ");
  const { email, password } = req.body;
  if (email === "1234@co.kr" && password === "1234") {
    res.send({ success: true, message: "로그인 성공" });
  } else {
    res.status(401).send({ success: false, message: "로그인 실패" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
