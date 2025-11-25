/**
 * 練習題 3：工具型別 (Utility Types)
 * 檔案名稱：ex3-utils.ts
 *
 * 🎯 目標：
 * 1. 使用 `Partial<T>` 來實作「更新功能」 (讓所有屬性變選填)。
 * 2. 使用 `Pick<T, K>` 來實作「預覽功能」 (只取出特定欄位)。
 */

// --- 原始資料介面 ---
interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
  createdAt: Date;
}

// 模擬資料庫
const dbUsers: User[] = [
  {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    role: "admin",
    createdAt: new Date(),
  },
  {
    id: 2,
    name: "Bob",
    email: "bob@example.com",
    role: "user",
    createdAt: new Date(),
  },
];

// --- 練習開始 ---

// TODO 1: 實作 updateUser 函式
// 需求：
// 1. `newDetails` 參數的型別必須使用 Utility Type，讓 User 的所有欄位變成「選填」。
//    (這樣呼叫時才不用把 id, email, role 全部傳進來)
const updateUser = (id: number, newDetails: any /* 請修改這裡的 any */) => {
  // 1. 找到該使用者
  const userIndex = dbUsers.findIndex((u) => u.id === id);
  if (userIndex === -1) {
    console.log(`User ${id} not found!`);
    return;
  }

  // 2. 更新資料 (合併舊資料與新資料)
  const updatedUser = { ...dbUsers[userIndex], ...newDetails };

  // 3. 存回模擬資料庫
  dbUsers[userIndex] = updatedUser;

  console.log(`User ${id} updated:`, updatedUser);
};

// TODO 2: 定義 UserSummary 類型
// 需求：使用 Utility Type 從 User 中「挑選」出 'name' 和 'email' 兩個欄位就好。
// 提示：Pick<T, K>
type UserSummary = any; // 請修改這裡

// TODO 3: 實作 getUserSummary 函式
// 需求：接收 User 陣列，回傳 UserSummary 陣列
const getUserSummary = (users: User[]): UserSummary[] => {
  // 請使用 map 回傳只包含 name 和 email 的物件
  return [];
};

// --- 主程式執行區 ---
console.log("--- Utility Types 練習 ---");

// 測試 1: 更新使用者 (只改名字)
console.log("1. 更新 Bob 的名字:");
// 觀察：如果你 TODO 1 寫對了，下面這行就不會報錯 (雖然 User 介面裡 email 是必填)
updateUser(2, { name: "Bobby" });

// 測試 2: 取得使用者列表摘要
console.log("\n2. 取得使用者摘要 (UserSummary):");
const summaries = getUserSummary(dbUsers);
console.log(summaries);
