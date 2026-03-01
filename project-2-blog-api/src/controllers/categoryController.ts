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

// 建立新分類
export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    // 基本的輸入驗證
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "name是必填欄位",
      });
    }

    const category = await prisma.catagory.create({
      data: {
        name,
      },
    });

    return res.status(201).json({
      success: true,
      data: category,
    });
  } catch (error) {
    console.error("Create category error:", error);

    return res.status(500).json({
      success: false,
      message: "伺服器發生錯誤，無法建立分類",
    });
  }
};