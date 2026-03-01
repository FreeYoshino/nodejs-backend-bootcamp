import { Router } from "express";
import { getAllPosts } from "../controllers/postController";

const router = Router();

// 定義路由：GET /api/posts
router.get("/", getAllPosts);

export default router;