/* 
    情境： 
    你從資料庫撈出了一堆髒亂的訂單資料，老闆要求你算出「所有已完成訂單的總金額」，並列出這些訂單的 ID。
    
    需求：
    使用 filter 篩選出status為"completed"的訂單。
    使用 map 轉出一個只包含訂單 ID 的陣列 ['ord001', 'ord003']。
    使用 reduce 計算這些完成訂單的總金額 (amount)。 
*/


// 原始資料
const orders = [
    { id: "ord001", amount: 1000, status: "completed" },
    { id: "ord002", amount: 500, status: "pending" },
    { id: "ord003", amount: 1200, status: "completed" },
    { id: "ord004", amount: 300, status: "canceled" },
];

// 1. 使用filter篩選已完成的訂單
const completedOrders = orders.filter(order => order.status === "completed");

// 2. 使用map轉出訂單ID陣列
const completedOrdersIds = completedOrders.map(order => order.id);

// 3. 使用reduce計算總金額
const totalAmount = completedOrders.reduce((sum, order) => sum + order.amount, 0);

// 輸出結果
console.log("已完成的訂單物件:", completedOrders);
console.log("已完成的訂單ID陣列:", completedOrdersIds);
console.log("已完成的訂單總金額:", totalAmount);

