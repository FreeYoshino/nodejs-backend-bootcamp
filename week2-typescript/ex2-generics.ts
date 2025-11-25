/**
 * 練習題 2：泛型 (Generics) - 萬用模具
 * 檔案名稱：ex2-generics.ts
 *
 * 🎯 目標：
 * 理解如何使用泛型 <T> 來建立可重用的 Interface 與 Function。
 *
 * 📝 需求規格：
 * 1. 定義 `ApiResponse<T>`：
 * - 屬性 success: boolean
 * - 屬性 data: T  (這是關鍵！data 的型別是變動的)
 * - 屬性 timestamp: number
 *
 * 2. 實作 `createResponse<T>`：
 * - 接收參數 data (型別 T)
 * - 回傳 ApiResponse<T>
 * - 內容要自動帶入 success: true 和 timestamp: Date.now()
 */

// --- 預先定義好的資料介面 (不用改) ---
interface UserProfile {
  id: number;
  name: string;
}

interface OrderDetail {
  orderId: string;
  amount: number;
}

// --- 練習開始 ---

// TODO 1: 定義泛型介面 ApiResponse<T>
// 提示：interface 名稱後面要加 <T>
interface ApiResponse<T> {
  // 請填寫屬性... (success, data, timestamp)
  success: boolean;
  timestamp: number;
  data: T;
}

// TODO 2: 實作泛型函式 createResponse
// 提示：const createResponse = <T>(data: T): ApiResponse<T> => { ... }
const createResponse = <T>(data: T): ApiResponse<T> => {
  // 請回傳一個物件，包含 success, data, timestamp
  // (這裡先給一個假的 return 防止編譯錯誤，請修改它)
  return {
    success: true, // 固定為true
    timestamp: Date.now(), // 當下時間毫秒數
    data: data,
  };
};

// --- 主程式執行區 ---
console.log("--- 泛型 API 回傳測試 ---");

// 模擬 1: 回傳使用者資料
const user: UserProfile = { id: 1, name: "Alice" };

// 呼叫你的函式 (這裡明確指定 T 是 UserProfile)
const userResponse = createResponse<UserProfile>(user);
console.log("User Response:", userResponse);

// TODO 3: 模擬回傳訂單資料
const order: OrderDetail = { orderId: "ord_999", amount: 2500 };

// 請建立 orderResponse，並呼叫 createResponse (指定 T 為 OrderDetail)
const orderResponse = createResponse<OrderDetail>(order);
console.log("Order Response:", orderResponse);
