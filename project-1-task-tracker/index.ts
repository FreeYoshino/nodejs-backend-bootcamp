import { Task } from "./type";

console.log("Task Tracker CLI 初始化成功！");

// 測試Task接口
const sampleTask: Task = {
  id: 1,
  description: "專案初始化測試",
  status: "todo",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

console.log("Sample Task:", sampleTask);
