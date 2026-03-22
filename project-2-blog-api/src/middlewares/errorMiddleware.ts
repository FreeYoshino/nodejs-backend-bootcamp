import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";

// 404 Not Found Middleware
export const notFoundMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const error = new Error(`找不到路徑: ${req.originalUrl}`) as any;
  error.statusCode = 404;
  next(error);
};

// Global Error Middleware
// 必須包含4個參數，才能被 Express 識別為錯誤處理中間件
export const globalErrorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "伺服器發生錯誤";
  let field = err.field || undefined;

  // 處理 Prisma 的特定錯誤
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002": // Unique constraint failed
        statusCode = 409;
        const targetField = (err.meta?.target as string[])?.[0];
        field = targetField;
        message = `資料重複，${targetField} 已存在`;
        break;
      case "P2025": // Record not found
        statusCode = 404;
        message = "找不到指定的紀錄";
        break;
      default:
        statusCode = 400;
        message = `資料庫操作失敗 (代碼: ${err.code})`;
        break;
    }
  }

  // 處理 Joi 的驗證錯誤
  if (err.isJoi) {
    statusCode = 400;
    message = err.details.map((detail: any) => detail.message).join(", ");
  }

  // 記錄錯誤 Log
  if (process.env.NODE_ENV !== "production") {
    console.error(`[Error Trace]: ${err}`);
  } else {
    console.error(`[Error]: ${message} | Path: ${req.path}`);
  }

  res.status(statusCode).json({
    status: "error",
    message,
    field,
    // 只有在開發環境才回傳錯誤堆疊資訊
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
};
