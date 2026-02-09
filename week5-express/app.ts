import express, { Request, Response } from "express";

const app = express();
const PORT = 3000;

// Middleware: 讓Express能夠解析JSON格式的request body
app.use(express.json());

// 模擬資料庫
interface Task {
  id: number;
  description: string;
  status: "todo" | "done";
}

let tasks: Task[] = [{ id: 1, description: "學習Express", status: "todo" }];

// [GET] 取得所有任務
app.get("/tasks", (req: Request, res: Response) => {
  res.json(tasks);
});

// [POST] 新增資料
app.post("/tasks", (req: Request, res: Response) => {
  const newDescription = req.body.description;

  if (!newDescription) {
    return res.status(400).json({ error: "請提供任務描述" });
  }

  const newTask: Task = {
    id: Date.now(),
    description: newDescription,
    status: "todo",
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// [DELETE] 刪除資料
app.delete("/tasks/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string); // 從URL參數中取得任務ID
  tasks = tasks.filter((task) => task.id !== id); // 過濾掉要刪除的任務
  res.json({ message: `任務 ${id} 已刪除`, remaining: tasks });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
