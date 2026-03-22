import { Router } from "express";
import { getAllUsers, createUser } from "../controllers/userController";
import { validate } from "../middlewares/validate";
import{ createUserSchema} from "./validators/userValidator";

const router = Router();

// 定義路由：GET /api/users
router.get("/", getAllUsers);
router.post("/", validate(createUserSchema), createUser);

export default router;