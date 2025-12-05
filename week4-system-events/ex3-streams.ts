/**
 * 練習題 3：串流處理 (Streams)
 * 檔案名稱：ex3-streams.ts
 *
 * 🎯 目標：
 * 1. 體驗處理大檔案時，Stream 如何節省記憶體。
 * 2. 學習 `createReadStream` (讀水管) 與 `createWriteStream` (寫水管)。
 * 3. 學習 `.pipe()` (把兩根水管接起來)。
 */

import fs from "fs"; // 注意：Stream 要用原本的 'fs'，不是 'fs/promises'
import path from "path";

// 定義檔案路徑
const bigFilePath = path.join(__dirname, "big-file.txt");
const copyFilePath = path.join(__dirname, "big-file-copy.txt");

// --- 輔助函式：產生一個 50MB 的大檔案 ---
const createBigFile = () => {
  console.log("正在產生測試大檔案 (約 50MB)...");
  const writeStream = fs.createWriteStream(bigFilePath);

  for (let i = 0; i < 1000000; i++) {
    writeStream.write(`這是第 ${i} 行資料，用來模擬巨大的 Log 檔案內容...\n`);
  }

  writeStream.end(); // 關閉水龍頭
  console.log("✅ 大檔案產生完畢！");
};

// --- 主程式：使用 Stream 複製檔案 ---
const copyFileWithStream = () => {
  console.log("--- 開始串流複製 ---");

  // TODO 1: 建立讀取水管 (Read Stream)
  // 使用 fs.createReadStream(檔案路徑, { encoding: 'utf-8' })
  // highWaterMark 是決定一次流多少水過來 (這裡設 64KB)
  const readStream = fs.createReadStream(bigFilePath, {
    encoding: "utf-8",
    highWaterMark: 64 * 1024, // 64KB
  })

  // TODO 2: 建立寫入水管 (Write Stream)
  // 使用 fs.createWriteStream(檔案路徑)
  const writeStream = fs.createWriteStream(copyFilePath);

  // 監聽 'data' 事件：每次有水流過來就會觸發
  let chunkCount = 0;
  readStream.on("data", (chunk) => {
    chunkCount++;
    // 這裡可以觀察到，檔案是被切成一塊一塊 (chunk) 進來的
    console.log(`收到第 ${chunkCount} 塊資料，大小: ${chunk.length} bytes`);
  });

  // TODO 3: 接水管 (.pipe)
  // 最神奇的一行！把讀取水管直接接到寫入水管
  readStream.pipe(writeStream);

  // 監聽 'end' 事件：水流完了
  readStream.on("end", () => {
    console.log(`🎉 複製完成！總共分成了 ${chunkCount} 次傳輸。`);
    console.log(`記憶體使用量依然很低，沒有爆炸！`);
  });

  // 錯誤處理
  readStream.on("error", (err) => console.error("發生錯誤:", err));
};

// --- 執行區 ---
// 1. 先產生檔案 (如果是第一次執行)
if (!fs.existsSync(bigFilePath)) {
  createBigFile();
  // 給一點時間讓檔案寫入完成再開始讀
  setTimeout(copyFileWithStream, 1000);
} else {
  // 2. 檔案已經存在，直接開始複製
  copyFileWithStream();
}
