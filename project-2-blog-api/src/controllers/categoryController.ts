import { Request, Response } from "express";
import prisma from "../lib/prisma";

// 取得所有分類
export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.catagory.findMany();

    return res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error("Get all categories error:", error);

    return res.status(500).json({
      success: false,
      message: "伺服器發生錯誤，無法取得分類資料",
    });
  }
};
