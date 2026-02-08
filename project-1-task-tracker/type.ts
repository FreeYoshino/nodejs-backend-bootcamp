// 定義任務狀態的類型
export type TaskStatus = "todo" | "in-progress" | "done";

// 定義任務的結構
export interface Task {
  id: number;           // 任務唯一的識別碼
  description: string;  // 任務的描述
  status: TaskStatus;   // 任務的狀態
  createdAt: string;    // 任務的創建時間
  updatedAt: string;    // 任務的更新時間
}
