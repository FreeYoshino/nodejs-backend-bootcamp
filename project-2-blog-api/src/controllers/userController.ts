import { Request, Response } from "express";
import prisma from "../lib/prisma";

// 取得所有使用者
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    // 從資料庫取得所有使用者
    const users = await prisma.user.findMany();

    // 回傳使用者資料
    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error("Get all users error:", error);

    // 回傳錯誤訊息
    return res.status(500).json({
      success: false,
      message: "伺服器發生錯誤，無法取得使用者資料",
    });
  }
};
