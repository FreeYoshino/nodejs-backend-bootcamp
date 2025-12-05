/**
 * 練習題 1：指令接收員 (Process & Arguments)
 * 檔案名稱：ex1-process.ts
 *
 * 🎯 目標：
 * 學習如何讀取使用者在終端機輸入的參數 (CLI Arguments)。
 * 這對於製作 CLI 工具 (如 Task Tracker) 至關重要。
 *
 * 📝 觀念補充：
 * - process: Node.js 的全域變數，控制當前的執行緒。
 * - process.argv: 一個陣列，包含所有輸入指令。
 * - index 0: Node.js 執行檔路徑
 * - index 1: 目前執行的 JS 檔案路徑
 * - index 2~N: 使用者真正輸入的參數 (我們要的！)
 */

// --- 練習開始 ---

// TODO 1: 觀察 process.argv
// 請直接印出 process.argv，等等執行時觀察它的結構
console.log("=== process.argv 觀察 ===");
console.log("process.argv:", process.argv);
console.log("=========================");

// TODO 2: 取得真正的參數 (Arguments)
// 我們只關心 index 2 之後的東西
// 請使用 slice(2) 來把前面的 Node路徑 和 檔案路徑 切掉
const args = process.argv.slice(2);
console.log("使用者參數:", args);

// TODO 3: 實作簡單的指令路由 (Router)
// 模擬 CLI 工具行為：
// - 如果輸入 "hello"，印出 "你好！Node.js 工程師"
// - 如果輸入 "show"，印出 "顯示系統資訊..."
// - 如果輸入其他東西，印出 "未知指令: [輸入的內容]"
const command = args[0];  // 第一個參數當作指令
if (command === "hello") {
  console.log("你好! Node.js 工程師");
}
else if (command === "show") {
  console.log("顯示系統資訊...");
  console.log("系統平台:", process.platform);
  console.log("Node.js 版本:", process.version);
}
else {
  console.log(`未知指令: ${command}`);
}

// TODO 4: (進階) 讀取 Flag (標籤)
// 假設使用者輸入 node ex1.js --user=Gemini
// 請試著用 find() 找出開頭是 "--user=" 的字串，並把 "Gemini" 擷取出來
// 提示：使用 startsWith('--user=') 和 split('=')
const userFlag = args.find((arg) => {
  return arg.startsWith('--user=');
})
if (userFlag) {
  const userName = userFlag.split("=")[1];
  console.log(`歡迎, ${userName}！`);
}