import { Pool } from "pg";

// 設定資料庫連線資訊
const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "task_tracker_db",
  user: "user",
  password: "password",
});

// 建立一個非同步函式來與資料庫溝通
async function testDatabaseConnection() {
  try {
    console.log("⏳ 正在敲資料庫的門...");

    // 傳送 SQL 語法給資料庫執行
    const result = await pool.query("SELECT * FROM tasks;");

    console.log("✅ 連線成功！從資料庫撈出的資料如下：");
    console.table(result.rows); // 使用 console.table 可以畫出漂亮的表格！
  } catch (error) {
    console.error("❌ 連線失敗，請檢查設定或 Docker 是否有啟動：", error);
  } finally {
    // 禮貌性關門：結束程式前，關閉與資料庫的連線
    await pool.end();
  }
}

// 執行這個函式
testDatabaseConnection();
