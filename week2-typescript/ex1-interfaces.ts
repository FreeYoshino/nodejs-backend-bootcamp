/**
 * 練習題 1：TypeScript 基礎 - Interface 與 Type
 *
 * 🎯 目標：
 * 重構 Week 1 的訂單處理邏輯。
 * 1. 定義 `Order` 的形狀 (Interface)，確保每個訂單都有正確的屬性。
 * 2. 使用 Union Type 限制 `status` 只能是特定的字串，防止打錯字。
 * 3. 為函式的參數與回傳值加上型別註解。
 *
 * 📝 需求規格：
 * 1. 定義 Type `OrderStatus`: 只能是 'completed' | 'pending' | 'canceled'。
 * 2. 定義 Interface `Order`:
 * - id: 字串
 * - amount: 數字
 * - status: 使用上面的 OrderStatus
 * 3. 實作三個函式 (邏輯同 Week 1，但要加型別)：
 * - filterOrders(orders, status): 回傳符合狀態的訂單陣列。
 * - getOrderIds(orders): 回傳訂單 ID 字串陣列。
 * - getTotalAmount(orders): 回傳所有訂單金額總和。
 *
 * ✅ 預期輸出：
 * 完成訂單: [ { id: 'ord001', amount: 1000, status: 'completed' }, ... ]
 * 訂單ID列表: [ 'ord001', 'ord003' ]
 * 總金額: 2200
 */

// 1. 定義訂單狀態類型 (Union Type)
type OrderStatus = "completed" | "pending" | "canceled";

// 2. 定義訂單介面 (Interface)
interface Order {
  id: string;
  amount: number;
  status: OrderStatus;
}

// 原始資料
const orders: Order[] = [
  { id: "ord001", amount: 1000, status: "completed" },
  { id: "ord002", amount: 500, status: "pending" },
  { id: "ord003", amount: 1200, status: "completed" },
  { id: "ord004", amount: 300, status: "canceled" },
];

// --- 練習開始 ---

// TODO 1: 實作 filterOrders
// 提示：參數 orders 是 Order[]，參數 status 是 OrderStatus，回傳值是 Order[]
const filterOrders = (data: Order[], status: OrderStatus): Order[] => {
  return data.filter((order) => order.status === status);
};

// TODO 2: 實作 getOrderIds
// 提示：回傳值是 string[]
const getOrderIds = (data: Order[]): string[] => {
  // 請填寫邏輯 (使用 map)
  return [];
};

// TODO 3: 實作 getTotalAmount
// 提示：回傳值是 number
const getTotalAmount = (data: Order[]): number => {
  // 請填寫邏輯 (使用 reduce)
  return 0;
};

// --- 主程式執行區 ---
console.log("--- TypeScript 訂單處理系統 ---");

const completedOrders = filterOrders(orders, "completed");
console.log("完成訂單:", completedOrders);

const ids = getOrderIds(completedOrders);
console.log("訂單ID列表:", ids);

const total = getTotalAmount(completedOrders);
console.log("總金額:", total);

// 🛡️ 測試型別保護 (取消下面這行的註解，VS Code 應該要出現紅線報錯才對)
// filterOrders(orders, "shipped");
