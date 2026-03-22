import { Router } from "express";
import {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postController";
import { validate } from "../middlewares/validate";
import {
  createPostSchema,
  updatePostSchema,
  getPostsQuerySchema,
  postIdParamSchema,
} from "./validators/postValidator";

const router = Router();

// 定義路由：GET /api/posts
router.get("/", validate(getPostsQuerySchema, "query"), getAllPosts);
router.post("/", validate(createPostSchema), createPost);
router.put(
  "/:id",
  validate(postIdParamSchema, "params"),
  validate(updatePostSchema),
  updatePost,
);
router.delete("/:id", validate(postIdParamSchema, "params"), deletePost);

export default router;
