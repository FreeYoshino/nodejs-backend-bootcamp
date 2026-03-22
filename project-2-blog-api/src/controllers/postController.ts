import { Request, Response, NextFunction } from "express";
import prisma from "../lib/prisma";
import { Prisma } from "@prisma/client";

// 定義Query的interface
interface GetPostsQuery {
  categoryId?: number;
  authorId?: number;
}

// 取得所有文章
export const getAllPosts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { categoryId, authorId } = res.locals.validatedData as GetPostsQuery;

    const posts = await prisma.post.findMany({
      where: {
        categoryId: categoryId,
        authorId: authorId,
      },
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
    next(error);
  }
};

// 建立新文章
export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { title, content, authorId, categoryId, published } =
      res.locals.validatedData;

    const post = await prisma.post.create({
      data: {
        title,
        content,
        // 建立關聯
        author: { connect: { id: authorId } },
        // categoryId 是可選的，只有在提供時才建立關聯
        ...(categoryId && {
          category: { connect: { id: categoryId } },
        }),
        published,
      },
    });

    return res.status(201).json({
      success: true,
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

// 更新文章
export const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id, title, content, categoryId, published } =
      res.locals.validatedData;

    // 構建更新資料
    const updateData: Prisma.PostUpdateInput = {
      title,
      content,
      published,
      ...(categoryId !== undefined && {
        category: categoryId
          ? { connect: { id: categoryId } }
          : { disconnect: true },
      }),
    };

    // 執行更新
    const post = await prisma.post.update({
      where: { id },
      data: updateData,
    });

    return res.status(200).json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

// 刪除文章
export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = res.locals.validatedData;

    await prisma.post.delete({
      where: { id },
    });

    return res.status(200).json({ success: true, message: "文章已成功刪除" });
  } catch (error) {
    next(error);
  }
};
