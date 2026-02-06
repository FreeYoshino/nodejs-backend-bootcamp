import { Task } from "./type";
import { readTasks, saveTasks } from "./taskStorage";
import { read } from "fs";

console.log("測試資料存取層");

// 讀取目前的任務列表
const tasks: Task[] = readTasks();
console.log("目前的任務列表:", tasks);

// 模擬新增任務
const newTask: Task = {
  id: Date.now(),
  description: "測試資料寫入功能",
  status: "todo",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

// 將新任務加入列表
tasks.push(newTask);
saveTasks(tasks);
console.log("新增任務後的任務列表:", readTasks());
