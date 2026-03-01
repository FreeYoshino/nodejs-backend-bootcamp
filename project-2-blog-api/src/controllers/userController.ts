import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { Prisma } from "@prisma/client";

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

// 建立新使用者
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body; // 從請求的 body 中取得 name 和 email

    // 基本的輸入驗證
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "name和email是必填欄位",
      });
    }

    // 使用 Prisma 寫入資料庫 建立新使用者
    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
    });

    return res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    // 處理Prisma的錯誤
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        // 這個錯誤碼代表 Unique constraint failed
        return res.status(400).json({
          success: false,
          message: "該email已被使用，請使用其他email",
        });
      }
    }

    // 其他未知錯誤
    console.error("Create user error:", error);
    return res.status(500).json({
      success: false,
      message: "伺服器發生未知錯誤，無法建立使用者",
    });
  }
};
