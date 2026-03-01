import { Request, Response } from "express";
import prisma from "../lib/prisma";

// 取得所有文章
export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: true,
        category: true,
      },
    });

    return res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    console.error("Get all posts error:", error);

    return res.status(500).json({
      success: false,
      message: "伺服器發生錯誤，無法取得文章資料",
    });
  }
};

