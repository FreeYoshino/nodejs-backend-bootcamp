import { Router } from "express";
import { getAllPosts, createPost } from "../controllers/postController";

const router = Router();

// 定義路由：GET /api/posts
router.get("/", getAllPosts);
router.post("/", createPost);

export default router;