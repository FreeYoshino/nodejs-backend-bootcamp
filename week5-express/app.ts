import express from "express";
import taskRoutes from "./routes/taskRoutes"; // 匯入路由

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json()); // 解析JSON請求

// Routes
app.get("/", (req, res) => {
  res.send("Task Tracker API is running!");
});

// 掛載路由
app.use("/tasks", taskRoutes); // 所有 /tasks 的請求都會由 taskRoutes 處理

// strart server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
