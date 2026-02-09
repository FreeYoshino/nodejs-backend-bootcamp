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

// [PUT] 更新資料
app.put("/tasks/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string);
  const { description, status } = req.body;

  // 搜尋任務
  const task = tasks.find((task) => task.id === id);

  if (!task) {
    res.status(404).json({ error: "任務不存在" });
    return;
  }

  // 更新任務
  if(description) task.description = description;
  if (status) task.status = status;
  
  res.json(task);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
