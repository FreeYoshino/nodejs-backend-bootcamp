import joi from "joi";
import { Request, Response, NextFunction } from "express";
export const validate = (
  schema: joi.ObjectSchema,
  source: "body" | "query" | "params" = "body",
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req[source], {
      abortEarly: false,
    });

    if (error) {
      // 傳遞error到全局錯誤處理器
      return next(error);
    }

    // 驗證成功，將驗證後的資料添加到res.locals內
    res.locals.validatedData = {
      ...res.locals.validatedData,
      ...value,
    }

    next();
  };
};
