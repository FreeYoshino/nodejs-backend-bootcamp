import { PrismaClient } from "@prisma/client";

// 建立 PrismaClient 實例並導出 以便在其他模組中使用
const prisma = new PrismaClient();
export default prisma;
