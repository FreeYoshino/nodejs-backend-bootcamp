import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { Prisma } from "@prisma/client";

// 取得所有文章
export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const { categoryId, authorId } = req.query;
    const where: Prisma.PostWhereInput = {};

    if (categoryId && !isNaN(Number(categoryId))) {
      where.categoryId = Number(categoryId);
    }
    if (authorId && !isNaN(Number(authorId))) {
      where.authorId = Number(authorId);
    }

    const posts = await prisma.post.findMany({
      where,  // 帶入篩選條件
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

// 建立新文章
export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content, authorId, categoryId, published = false } = req.body;

    // 基本的輸入驗證
    if (!title || !authorId) {
      return res.status(400).json({
        success: false,
        message: "title 和 authorId 是必填欄位",
      });
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        // 建立關聯
        author: { connect: { id: Number(authorId) } },
        // categoryId 是可選的，只有在提供時才建立關聯
        ...(categoryId && {
          category: { connect: { id: Number(categoryId) } }
        }),
        published,
      },
    });

    return res.status(201).json({
      success: true,
      data: post,
    });
  } catch (error) {
    // 處理處理Prisma的錯誤
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // P2025 代表關聯的紀錄（User 或 Category）找不到
      if (error.code === "P2025") {
        return res.status(404).json({
          success: false,
          message: "找不到對應的 authorId 或 categoryId",
        });
      }
    }

    // 其他未知錯誤
    console.error("Create post error:", error);
    return res.status(500).json({
      success: false,
      message: "伺服器發生錯誤，無法建立文章",
    });
  }
};
