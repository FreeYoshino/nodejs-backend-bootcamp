import { Router } from "express";
import { getAllUsers, createUser } from "../controllers/userController";

const router = Router();

// 定義路由：GET /api/users
router.get("/", getAllUsers);
router.post("/", createUser);

export default router;