/**
 * 練習題 1：路徑指揮官 (Path Module)
 * 檔案名稱：ex1-path.ts
 *
 * 🎯 目標：
 * 了解為什麼不能用字串拼湊路徑，並學會使用 Node.js 內建的 `path` 模組來處理跨平台路徑問題。
 *
 * 📝 觀念補充：
 * - __dirname: Node.js 的全域變數，代表「當前這支程式所在的資料夾路徑」(絕對路徑)。
 * - path.join(): 幫你把路徑接起來，會自動處理 Windows (\) 與 Mac (/) 的差異。
 * - path.extname(): 取得副檔名。
 */

// 引入 Node.js 內建的 path 模組
import path from "path";

// --- 練習開始 ---

// TODO 1: 探索 __dirname
// 請 console.log 印出 __dirname，觀察它長什麼樣子
// 這在讀檔時非常重要，因為我們通常是「相對於目前程式」去找檔案
console.log(); // 請修改這裡

// TODO 2: 組合路徑 (最重要！)
// 情境：我們想在當前資料夾下，找一個叫做 "files" 資料夾裡面的 "report.pdf"
// ❌ 錯誤示範 (不要這樣寫)： const badPath = __dirname + "/files/report.pdf";
// ✅ 請使用 path.join 來組合：__dirname, "files", "report.pdf"
const fullPath = ""; // 請修改這裡，使用 path.join(...)

console.log("組合後的完整路徑:", fullPath);

// TODO 3: 解析路徑
// 情境：我們拿到一個檔案路徑，想要知道它的「副檔名」是什麼 (例如 .pdf, .txt)
// 請使用 path.extname(fullPath) 來取得
const extension = ""; // 請修改這裡

console.log("檔案副檔名:", extension);

// TODO 4: (進階) 解析整個路徑資訊
// 使用 path.parse(fullPath) 可以一次拿到 root, dir, base, ext, name 所有資訊
// 請嘗試印出 path.parse(fullPath) 的結果
console.log("路徑詳細資訊:", {}); // 請修改這裡
