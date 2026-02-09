import express from "express";

const app = express();
const PORT = 3000;

// 1. 基本的路由(Root Route)
app.get("/", (req, res) => {
  res.send("Hello, Express! 這是根路由");
});

// [GET] 讀取資料
app.get("/tasks", (req, res) => {
  res.send("這是一個GET請求: 你想讀取所有任務");
});

// [POST] 新增資料
app.post("/tasks", (req, res) => {
  res.send("這是一個POST請求: 你想新增一個任務");
});

// [DELETE] 刪除資料
app.delete("/tasks", (req, res) => {
  res.send("這是一個DELETE請求: 你想刪除一個任務");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
