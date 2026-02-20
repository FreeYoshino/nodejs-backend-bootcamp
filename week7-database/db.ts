import { Pool } from "pg";

// 設定資料庫連線資訊
const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "task_tracker_db",
  user: "user",
  password: "password",
});

// CRUD 操作練習

// 1.新增任務 (Create - INSERT)
async function createTask(description: string) {
  // INSERT INTO 表格名 (欄位1, 欄位2) VALUES (值1, 值2);
  // RETURNING *　可以回傳剛剛新增的資料
  const query = `
    INSERT INTO tasks (description, status)
    VALUES ($1, $2)
    RETURNING *;
  `;
  const values = [description, "todo"];
  const result = await pool.query(query, values);
  console.log("新增成功.", result.rows[0]);
}

// 2.讀取任務 (Read - SELECT)
async function getAllTasks() {
  // SELECT 欄位1 FROM 表格名 ORDER BY 排序依據;
  const query = "SELECT * FROM tasks ORDER BY id ASC;";
  const result = await pool.query(query);
  console.log("所有任務:");
  console.table(result.rows);
}

// 3.跟新任務狀態 (Update - UPDATE)
async function updateTaskStatus(id: number, newStatus: string) {
  // UPDATE 表格名 SET 欄位1 = 新值1 WHERE 條件;
  const query = `
    UPDATE tasks
    SET status = $1
    WHERE id = $2
    RETURNING *;
  `;
  const values = [newStatus, id];
  const result = await pool.query(query, values);

  // rowCount 可以知道有幾筆資料被更新
  if (result.rowCount === 0) {
    console.log(`沒有找到ID為${id}的任務.`);
  } else {
    console.log("更新成功.", result.rows[0]);
  }
}

// 4.刪除任務 (Delete - DELETE)
async function deleteTask(id: number) {
  // DELETE FROM 表格名 WHERE 條件;
  const query = `
    DELETE FROM tasks
    WHERE id = $1
    RETURNING *;
  `;
  const values = [id];
  const result = await pool.query(query, values);

  if (result.rowCount === 0) {
    console.log(`沒有找到ID為${id}的任務.`);
  }
  else {
    console.log("刪除成功.", result.rows[0]);
  }
}

// 重置資料表 (清空資料讓測試更方便)
async function resetTasksTable() {
  // TRUNCATE TABLE 表格名; 會清空所有資料
  // RESTART IDENTITY 會把自動增量的ID重置回1
  const query = "TRUNCATE TABLE tasks RESTART IDENTITY;";
  await pool.query(query);
  console.log("資料表已重置");
}

// 測試執行
async function run() {
  try {
    console.log("--- 開始SQL測試 ---");
    await resetTasksTable(); // 先重置資料表

    // 1.新增任務
    await createTask("學習INSERT語法");
    await createTask("即將被刪除的任務");

    // 2.印出所有任務
    await getAllTasks();

    // 3.更新任務狀態
    await updateTaskStatus(1, "done");

    // 4.刪除任務
    await deleteTask(2);

    // 最終結果
    console.log("--- 最終任務列表 ---");
    await getAllTasks();
  } catch (error) {
    console.error("發生錯誤:", error);
  } finally {
    await pool.end(); // 關閉資料庫連線
  }
}

run();
