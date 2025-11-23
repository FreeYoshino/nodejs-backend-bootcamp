/**
 * 練習題 3：物件重組與預設值 (Spread Operator & Destructuring)
 *
 * 🎯 目標：
 * 熟練使用 Spread Operator (...) 來合併物件，以及使用 Destructuring (解構賦值) 來提取資料。
 * 這是後端處理「使用者設定」、「預設參數」或「API 回傳資料篩選」時的必備技巧。
 *
 * 📝 需求規格：
 * 1. 定義預設設定 `defaultSettings`：
 * - theme: "light"
 * - notifications: true
 * - privacy: "public"
 * - version: "1.0.0"
 *
 * 2. 定義使用者偏好 `userSettings`：
 * - theme: "dark" (使用者想要深色模式)
 * - privacy: "friends" (使用者想要好友限定)
 * - (注意：使用者沒有設定 notifications 和 version，這兩項應該要維持預設值)
 *
 * 3. 實作合併邏輯：
 * - 建立一個新物件 `finalSettings`。
 * - 使用 Spread Operator (...) 將 `defaultSettings` 與 `userSettings` 合併。
 * - 規則：使用者的設定必須覆蓋預設值 (User overrides Default)。
 *
 * 4. 實作資料提取：
 * - 使用 Destructuring (解構) 從 `finalSettings` 中取出 `theme` 和 `privacy` 兩個變數。
 * - 同時將 `version` 解構出來，但重新命名為 `appVersion`。
 *
 * 5. 輸出結果：
 * - 印出 finalSettings (檢查是否合併正確)。
 * - 印出 theme, privacy, appVersion。
 *
 * ✅ 預期輸出：
 * 最終設定: { theme: 'dark', notifications: true, privacy: 'friends', version: '1.0.0' }
 * Theme: dark
 * Privacy: friends
 * App Version: 1.0.0
 */

// 1. 定義預設設定
const defaultSettings = {
  theme: "light",
  notifications: "true",
  privacy: "public",
  version: "1.0.0",
};

// 2. 定義使用者偏好
const userSettings = {
  theme: "dark",
  privacy: "friends",
};

// 3. 實作合併邏輯
// 使用 Spread Operator 合併物件
// Overwrite 後面的屬性值蓋掉前面的屬性值
const finalSettings = {
  ...defaultSettings,
  ...userSettings,
};

// 4. 實作資料提取
// Rename語法： { 舊名字: 新名字 }
const { theme, privacy, version: appVersion } = finalSettings;

// 5. 輸出結果
console.log("Final Settings: ", finalSettings);
console.log("Theme: ", theme);
console.log("Privacy: ", privacy);
console.log("App Version: ", appVersion);
