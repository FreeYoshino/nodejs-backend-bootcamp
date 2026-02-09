import { Request, Response } from "express";

// 模擬資料庫
interface Task {
  id: number;
  description: string;
  status: "todo" | "done";
}

let tasks: Task[] = [{ id: 1, description: "學習Express", status: "todo" }];

// [GET] 取得所有任務
export const getTasks = (req: Request, res: Response) => {
  res.json(tasks);
};

// [POST] 新增資料
export const createTask = (req: Request, res: Response) => {
  const { description } = req.body;
  if (!description) {
    return res.status(400).json({ error: "請提供任務描述" });
  }
  const newTask: Task = {
    id: Date.now(),
    description: description,
    status: "todo",
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
};

// [PUT] 更新資料]
export const updateTask = (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string);
  const { description, status } = req.body;

  // 搜尋任務
  const task = tasks.find((task) => task.id === id);
  if (!task) {
    res.status(404).json({ error: "任務不存在" });
    return;
  }

  // 更新任務
  if (description) task.description = description;
  if (status) task.status = status;

  res.json(task);
}

// [DELETE] 刪除資料
export const deleteTask = (req: Request, res: Response) => { 
  const id = parseInt(req.params.id as string); // 從URL參數中取得任務ID
  const initialLength = tasks.length;
  tasks = tasks.filter((task) => task.id !== id); // 過濾掉要刪除的任務

  if (tasks.length === initialLength) { 
    res.status(404).json({ error: "任務不存在" });
    return;
  }

  res.json({ message: `任務 ${id} 已刪除`, remaining: tasks });
}