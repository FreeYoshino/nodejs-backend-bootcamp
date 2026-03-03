import { Router } from "express";
import { getAllPosts, createPost, updatePost, deletePost } from "../controllers/postController";

const router = Router();

// 定義路由：GET /api/posts
router.get("/", getAllPosts);
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;