import fs from "fs";
import path from "path";
import { Task } from "./type";

// 定義任務儲存的文件路徑
const filePath = path.join(__dirname, "tasks.json");

/* 
  讀取所有任務
  @returns Task[] 任務陣列
*/
export const readTasks = (): Task[] => {
  // 檢查文件是否存在
  if (!fs.existsSync(filePath)) {
    return [];
  }

  // 讀取文件內容
  const fileContent = fs.readFileSync(filePath, "utf-8");

  // 解析 JSON 並返回任務陣列
  try {
    return JSON.parse(fileContent) as Task[];
  } catch (error) {
    console.error("讀取任務失敗:", error);
    return [];
  }
};

/* 
  儲存所有任務
  @param tasks Task[] 任務陣列
*/
export const saveTasks = (tasks: Task[]): void => {
  const content = JSON.stringify(tasks, null, 2); // 格式化 JSON 以便閱讀
  fs.writeFileSync(filePath, content, "utf-8");
};
