import express from "express";
import userRoutes from "./routes/userRoutes"; // 匯入使用者路由
import categoryRoutes from "./routes/categoryRoutes"; // 匯入分類路由
import postRoutes from "./routes/postRoutes"; // 匯入文章路由
import { notFoundMiddleware, globalErrorMiddleware } from "./middlewares/errorMiddleware";

const app = express();

// Middleware
app.use(express.json()); // 解析 JSON 請求

// Routes
app.get("/", (req, res) => {
  res.send("Blog API is running!");
});

// 掛載路由
app.use("/api/users", userRoutes); // 所有 /api/users 的請求都會由 userRoutes 處理
app.use("/api/categories", categoryRoutes); // 掛載分類路由
app.use("/api/posts", postRoutes); // 掛載文章路由

// 404 Not Found 處理 - 當沒有任何路由匹配時，會執行這個中間件
app.use(notFoundMiddleware);

// Global Error Middleware - 處理所有錯誤
app.use(globalErrorMiddleware);

//  啟動伺服器
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
