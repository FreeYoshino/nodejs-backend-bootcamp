import { Router } from "express";
import { getAllPosts, createPost, updatePost } from "../controllers/postController";

const router = Router();

// 定義路由：GET /api/posts
router.get("/", getAllPosts);
router.post("/", createPost);
router.put("/:id", updatePost);

export default router;