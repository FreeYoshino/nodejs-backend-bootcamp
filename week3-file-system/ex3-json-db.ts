/**
 * 練習題 3：JSON 資料庫模擬
 * 檔案名稱：ex3-json-db.ts
 *
 * 🎯 目標：
 * 實作一個簡單的「檔案型資料庫」。
 * 能夠讀取 JSON 檔案，新增資料，然後再存回去。
 */

import fs from "fs/promises";
import path from "path";

// 定義資料庫檔案路徑
const dbPath = path.join(__dirname, "todos.json");

// 定義 Todo 的形狀
interface Todo {
  id: number;
  task: string;
  done: boolean;
}

const main = async () => {
  try {
    console.log("--- JSON DB 練習開始 ---");

    // 1. 初始化：檢查檔案是否存在，不存在就建立一個空的 []
    try {
      await fs.access(dbPath); // 測試檔案能不能讀取
    } catch {
      console.log("檔案不存在，初始化一個空的 []");
      await fs.writeFile(dbPath, "[]"); // 寫入空陣列字串
    }

    // TODO 1: 讀取現有的資料
    // 步驟 A: 使用 fs.readFile 讀取檔案 (記得用 utf-8)
    // 步驟 B: 使用 JSON.parse() 把字串變成 Todo[] 陣列
    // ... 請在此實作讀取邏輯 ...

    console.log("目前資料庫內容:", todos);

    // TODO 2: 新增一筆資料
    // 請建立一個新 Todo 物件 (id 可以用 Date.now(), task 隨便寫, done: false)
    // 然後把它 push 到上面的 todos 陣列裡
    // const newTodo: Todo = ... 請在此實作建立新 Todo 物件 ...
    // ... 請在此把 newTodo 加入 todos 陣列 ...

    // TODO 3: 寫回檔案 (持久化)
    // 步驟 A: 使用 JSON.stringify(todos, null, 2) 把陣列變回字串
    // (那個 null, 2 是為了讓 JSON 縮排漂亮，不是擠成一行)
    // 步驟 B: 使用 fs.writeFile 寫回檔案
    // const updatedContent = ... 請在此實作轉字串邏輯
    // ... 請在此實作寫入邏輯 ...

    console.log("✅ 新增成功！請打開 todos.json 查看結果");
  } catch (error) {
    console.error("發生錯誤:", error);
  }
};

main();
