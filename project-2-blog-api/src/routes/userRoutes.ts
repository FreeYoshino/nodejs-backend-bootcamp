import { Router } from "express";
import { getAllUsers } from "../controllers/userController";

const router = Router();

// 定義路由：GET /api/users
router.get("/", getAllUsers);

export default router;