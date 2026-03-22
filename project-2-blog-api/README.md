# Blog API Project

這是一個基於 Express、TypeScript 與 Prisma 構建的部落格 API 系統。包含使用者、分類與文章的完整 CRUD 功能，並實作了 Joi 格式驗證與統一的錯誤處理機制。

## 📚 API 路由清單

Base URL: `http://localhost:3000/api`

### 👤 使用者 (Users)

| Method | Endpoint | 說明           | Request Body / Query                      |
| :----- | :------- | :------------- | :---------------------------------------- |
| `GET`  | `/users` | 取得所有使用者 | -                                         |
| `POST` | `/users` | 建立新使用者   | `{ "name": "字串", "email": "信箱格式" }` |

### 🏷️ 分類 (Categories)

| Method | Endpoint      | 說明         | Request Body / Query |
| :----- | :------------ | :----------- | :------------------- |
| `GET`  | `/categories` | 取得所有分類 | -                    |
| `POST` | `/categories` | 建立新分類   | `{ "name": "字串" }` |

### 📝 文章 (Posts)

| Method   | Endpoint     | 說明                        | Request Body / Query                                                                                            |
| :------- | :----------- | :-------------------------- | :-------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/posts`     | 取得所有文章 (支援條件篩選) | `?categoryId=數字&authorId=數字`                                                                                |
| `POST`   | `/posts`     | 建立新文章                  | `{ "title": "必填", "content": "必填", "authorId": 必填數字, "categoryId": 可選數字, "published": 可選布林值 }` |
| `PUT`    | `/posts/:id` | 更新文章                    | `{ "title": "字串", "content": "字串", "categoryId": 可選, "published": 可選布林值 }`                        |
| `DELETE` | `/posts/:id` | 刪除文章                    | `id` (文章ID)                                                                                                   |
