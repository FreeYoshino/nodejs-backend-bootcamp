import express from "express";

const app = express();
const PORT = 3000;

// 1. 基本的路由(Root Route)
app.get("/", (req, res) => {
  res.send("Hello, Express! 這是根路由");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
