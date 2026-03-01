import { Router } from "express";
import { getAllCategories, createCategory } from "../controllers/categoryController";

const router = Router();

// 定義路由：GET /api/categories
router.get("/", getAllCategories);
router.post("/", createCategory);

export default router;