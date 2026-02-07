import { readTasks, saveTasks } from "./taskStorage";
import { Task, TaskStatus } from "./type";

// 新增任務(Add)
export const addTask = (description: string): void => {
  const tasks = readTasks();
  const newTask: Task = {
    id: Date.now(),
    description,
    status: "todo",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  tasks.push(newTask);
  saveTasks(tasks);
  console.log(`任務新增成功: ID ${newTask.id})`);
};

// 更新任務描述(Update)
export const updateTask = (id: number, description: string): void => {
  const tasks = readTasks();
  const task = tasks.find((t) => t.id === id);

  // 如果任務不存在 提示用戶
  if (!task) {
    console.log(`任務更新失敗: 找不到ID為 ${id} 的任務`);
    return;
  }

  task.description = description;
  task.updatedAt = new Date().toISOString();
  saveTasks(tasks);
  console.log(`任務更新成功: ID ${id}`);
};

// 刪除任務(Delete)
export const deleteTask = (id: number): void => {
  const tasks = readTasks();
  const newTasks = tasks.filter((t) => t.id !== id); // 過濾掉要刪除的任務

  // 如果任務不存在 提示用戶
  if (tasks.length === newTasks.length) {
    console.log(`任務刪除失敗: 找不到ID為 ${id} 的任務`);
    return;
  }
  saveTasks(newTasks);
  console.log(`任務刪除成功: ID ${id}`);
};

// 標記任務狀態(Mark Status)
export const markTaskStatus = (id: number, status: TaskStatus): void => {
  const tasks = readTasks();
  const task = tasks.find((t) => t.id === id);

  // 如果任務不存在 提示用戶
  if (!task) {
    console.log(`任務狀態更新失敗: 找不到ID為 ${id} 的任務`);
    return;
  }
  task.status = status;
  task.updatedAt = new Date().toISOString();
  saveTasks(tasks);
  console.log(`任務狀態更新成功: ID ${id} 現在是 ${status}`);
};

// 列出任務列表(List)
export const listTasks = (statusFilter?: TaskStatus): void => {
  const tasks = readTasks();
  const filteredTasks = statusFilter
    ? tasks.filter((t) => t.status === statusFilter)
    : tasks;

  if (filteredTasks.length === 0) {
    console.log("沒有符合條件的任務");
    return;
  }

  console.log(`任務列表(${statusFilter ?? "全部"}):`);
  filteredTasks.forEach((task) => {
    console.log(
      `ID: ${task.id}, 描述: ${task.description}, 狀態: ${task.status}`,
    );
  });
};
