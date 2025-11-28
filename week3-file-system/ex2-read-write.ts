/**
 * 練習題 2：檔案讀寫 (File System)
 * 檔案名稱：ex2-read-write.ts
 *
 * 🎯 目標：
 * 1. 使用 `fs/promises` 模組來進行非同步檔案讀寫。
 * 2. 寫入檔案：把字串寫入硬碟。
 * 3. 讀取檔案：把硬碟的內容讀回變數。
 *
 * 📝 觀念補充：
 * - import fs from 'fs/promises'; (注意是 fs/promises，不是 fs)
 * - writeFile(路徑, 內容): 會直接覆蓋原本檔案。
 * - readFile(路徑, 'utf-8'): 讀取檔案，記得指定編碼，不然會拿到 Buffer (二進位資料)。
 */

import fs from "fs/promises";
import path from "path";

// 定義我們要操作的檔案路徑 (在當前資料夾下建立一個 test.txt)
const filePath = path.join(__dirname, "test.txt");

const main = async () => {
  try {
    console.log("--- 開始檔案寫入測試 ---");

    // 準備要寫入的內容
    const content = `Hello Node.js File System! 現在時間: ${new Date().toISOString()}`;

    // TODO 1: 寫入檔案
    // 語法：await fs.writeFile(路徑, 內容);
    // 請在此實作寫入邏輯...

    console.log("✅ 寫入成功！");

    console.log("--- 開始檔案讀取測試 ---");

    // TODO 2: 讀取檔案
    // 語法：const data = await fs.readFile(路徑, 'utf-8');
    // 請在此實作讀取邏輯...
    // const data = ...

    // console.log("📖 讀取到的內容:\n", data);

    // TODO 3: (加分題) 刪除檔案 (清理戰場)
    // 為了不留下垃圾檔案，測試完後可以使用 await fs.unlink(路徑) 把檔案刪掉
    // console.log("🗑️ 測試檔案已刪除");
  } catch (error) {
    console.error("發生錯誤:", error);
  }
};

main();
