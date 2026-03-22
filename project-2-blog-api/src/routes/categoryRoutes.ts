import { Router } from "express";
import { getAllCategories, createCategory } from "../controllers/categoryController";
import { validate } from "../middlewares/validate";
import { createCategorySchema } from "./validators/categoryValidator";

const router = Router();

// 定義路由：GET /api/categories
router.get("/", getAllCategories);
router.post("/", validate(createCategorySchema), createCategory);

export default router;