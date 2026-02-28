import { PrismaClient } from "@prisma/client";

// 傳入 log 設定，讓 Prisma 執行時印出底層的 SQL 語法，非常適合學習！
const prisma = new PrismaClient({
    log: ['query']
} as any);

async function main() {
  console.log("開始向資料庫查詢...");

  // Prisma 的 JOIN: 使用 `include` 來查詢相關聯的資料
  const allUser = await prisma.user.findMany({
    include: {
      tasks: true, // 這裡會把每個 user 的 task 資料也查詢出來
    },
  });

  console.log("查詢完成，結果如下：");
  console.dir(allUser, { depth: null }); // 使用 depth: null 來完整顯示物件結構
}

// 執行主程式
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
