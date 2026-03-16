import { Request, Response, NextFunction } from "express";

// 404 Not Found Middleware
export const notFoundMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const error = new Error(`Not Found: ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Global Error Middleware
// 必須包含4個參數，才能被 Express 識別為錯誤處理中間件
export const globalErrorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  console.error(`[Error]: ${err.message}`);

  res.status(statusCode).json({
    status: "error",
    message: err.message,
    // 在開發環境中返回堆疊訊息，在生產環境中隱藏堆疊訊息
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
