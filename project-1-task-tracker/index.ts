import {
  addTask,
  updateTask,
  deleteTask,
  markTaskStatus,
  listTasks,
} from "./service";
import { TaskStatus } from "./type";

// 解析命令行參數
const args = process.argv.slice(2);
const command = args[0]; // 命令 (add, update, delete, mark, list)

// 根據命令執行對應的操作
switch (command) {
  case "add":
    const description = args.slice(1);
    if (description.length === 0) {
      console.log("錯誤: 請提供任務描述");
    } else {
      addTask(description.join(" "));
    }
    break;

  case "update":
    const updateId = parseInt(args[1]);
    const updateDescription = args.slice(2);
    if (isNaN(updateId) || updateDescription.length === 0) {
      console.log("錯誤: 請提供任務ID和新的描述");
    } else {
      updateTask(updateId, updateDescription.join(" "));
    }
    break;

  case "delete":
    const deleteId = parseInt(args[1]);
    if (isNaN(deleteId)) {
      console.log("錯誤: 請提供任務ID");
    } else {
      deleteTask(deleteId);
    }
    break;

  case "mark-in-progress":
    const progId = parseInt(args[1]);
    if (isNaN(progId)) {
      console.log("錯誤: 請提供任務ID");
    } else {
      markTaskStatus(progId, "in-progress");
    }
    break;

  case "mark-done":
    const doneId = parseInt(args[1]);
    if (isNaN(doneId)) {
      console.log("錯誤: 請提供任務ID");
    } else {
      markTaskStatus(doneId, "done");
    }
    break;

  case "list":
    const statusFilter = args[1] as TaskStatus | undefined;
    listTasks(statusFilter);
    break;
  
  default:
    console.log(`未知命令: ${command}`);
    console.log("可用命令: add, update, delete, mark-in-progress, mark-done, list");
    break;
}
