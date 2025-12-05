/**
 * 練習題 2：事件驅動架構 (EventEmitter)
 * 檔案名稱：ex2-events.ts
 *
 * 🎯 目標：
 * 理解 Node.js 的核心機制 "Observer Pattern" (觀察者模式)。
 * 學習如何「發送事件 (emit)」與「監聽事件 (on)」。
 *
 * 📝 觀念補充：
 * - EventEmitter: Node.js 內建類別，用來管理事件。
 * - .on('事件名', callback): 訂閱事件 (當這件事發生時，請執行這個 function)。
 * - .emit('事件名', 資料): 發送事件 (告訴大家這件事發生了，並附上資料)。
 */

import { EventEmitter } from "events";

// 1. 建立一個繼承 EventEmitter 的類別
class DownloadManager extends EventEmitter {
  // 模擬下載功能
  startDownload(filename: string) {
    console.log(`[系統] 準備下載: ${filename}`);

    // TODO 1: 發送 'start' 事件
    // 告訴監聽者下載開始了
    this.emit("start", filename);

    // 模擬進度 (每 500ms 跑一次)
    let progress = 0;
    const timer = setInterval(() => {
      progress += 20;

      if (progress <= 100) {
        // TODO 2: 發送 'progress' 事件
        // 帶上目前的進度數字 (progress)
        this.emit("progress", progress);
      } else {
        clearInterval(timer);
        // TODO 3: 發送 'complete' 事件
        // 帶上 "下載完成" 的訊息
        this.emit("complete", `${filename} 下載完成`);
      }
    }, 500);
  }
}

// --- 主程式執行區 ---

const downloader = new DownloadManager();

// --- 監聽區 (訂閱事件) ---
// 這裡就像是你訂閱了 YouTube 頻道，有新影片(事件)就會通知你

// 監聽 'start'
downloader.on("start", (filename) => {
  console.log(`✅ 收到通知：${filename} 開始下載...`);
});

// TODO 4: 監聽 'progress'
// 印出: "⏳ 下載進度: 20%" ... 等等
downloader.on("progress", (percent) => {
  console.log(`⏳ 下載進度: ${percent}%`);
});

// TODO 5: 監聽 'complete'
// 印出: "🎉 恭喜！檔案處理完畢。"
downloader.on("complete", (message) => {
  console.log(`🎉 恭喜！${message}`);
});
// --- 觸發區 ---
console.log("--- 事件驅動測試開始 ---");
downloader.startDownload("game-setup.exe");
