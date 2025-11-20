/* 
  練習題2: 模擬API請求(Async/Await)
  
  目標: 
  練習使用 Promise 和 setTimeout 來模擬後端非同步API行為
  並使用 async/await 以類同不的方式執行

  需求:
  1. 建立一個 getUser(id) 函式
      - 接收一個使用者ID作為參數
      - 回傳一個 Promise，模擬非同步API請求
      - 模擬 1000ms 的網路延遲
      - 邏輯:
      - 落 id < 0 時，拒絕(reject) Promise，並傳回錯誤訊息 "Invalid user ID"
      - 落 id >= 0 時，解決(resolve) Promise，並傳回一個模擬的使用者物件 { id: id, name: "UserName" }

  2. 建立一個 getPostsByUser(userId) 函式
      - 接收一個使用者ID作為參數
      - 模擬 500ms 的網路延遲
      - 邏輯:
      - 無論如何都成功 resolve，回傳文章陣列 ['Post 1', 'Post 2', 'Post 3']

  3. 主流程 main():
      - 必須是 async function
      - 使用 try/catch 處理錯誤
      - 流程:
      - (1) 呼叫 getUser(id) 取得使用者資料，並印出使用者名稱
      - (2) 呼叫 getPostsByUser(userId) 取得該使用者的文章，並印出文章列表

  預期輸出:
  ---開始模擬API請求---
  正在讀取使用者資料...
  (等待 1 秒)
  User fetched: UserName
  正在讀取Posts...
  (等待 0.5 秒)
  Posts fetched: [ 'Post 1', 'Post 2', 'Post 3' ]
  ---測試錯誤捕捉---
  發生錯誤: Invalid user ID
*/

// 1. 建立 getUser 函式
const getUser = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id < 0) {
        reject(new Error("Invalid user ID"));
      } else {
        resolve({ id: id, name: "UserName" });
      }
    }, 1000);
  });
};

// 2. 建立 getPostsByUser 函式
const getPostsByUser = (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(["Post 1", "Post 2", "Post 3"]);
    }, 500);
  });
};

// 3. 主流程 main
const main = async () => {
  console.log("---開始模擬API請求---");
  try {
    console.log("正在讀取使用者資料...");
    const user = await getUser(1);
    console.log("User fetched:", user.name);
    console.log("正在讀取Posts...");
    const posts = await getPostsByUser(user.id);
    console.log("Posts fetched:", posts);
    console.log("---測試錯誤捕捉---");
    await getUser(-1);
  } catch (error) {
    console.log("發生錯誤:", error.message);
  }
};

// 執行主流程
main();