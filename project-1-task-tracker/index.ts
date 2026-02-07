import { Task } from "./type";
import {
  addTask,
  updateTask,
  deleteTask,
  markTaskStatus,
  listTasks,
} from "./service";

console.log("測試Service功能");

// // 新增任務
// addTask("完成task tracker專案");
// addTask("學習TypeScript");
// addTask("進入phase 2");



// 測試更新任務描述
updateTask(1770437748698, "完成task tracker專案 - 更新描述");
updateTask(123456789, "這個ID不存在的任務");

// 測試標記任務狀態
markTaskStatus(1770437748698, "in-progress");
markTaskStatus(123456789, "done"); // 測試標記不存在的任務狀態

// 測試刪除任務
deleteTask(1770437748698);
deleteTask(123456789); // 測試刪除不存在的任務

// 列出所有任務
listTasks();