import { Router } from "express";
import { getAllCategories } from "../controllers/categoryController";

const router = Router();

// 定義路由：GET /api/categories
router.get("/", getAllCategories);

export default router;