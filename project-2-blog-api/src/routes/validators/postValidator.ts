import joi from "joi";

export const createPostSchema = joi.object({
  title: joi.string().trim().min(1).max(255).required().messages({
    "string.empty": "title 不能為空",
    "any.required": "title 是必填欄位",
    "string.min": "標題長度至少需要 {#limit} 個字元",
    "string.max": "標題長度不能超過 {#limit} 個字元",
  }),
  content: joi.string().trim().allow(null, "").optional().messages({
    "string.base": "內容必須是字串格式",
  }),
  published: joi.boolean().default(false).messages({
    "boolean.base": "發布狀態必須是一個布林值(true/false)",
  }),
  authorId: joi.number().integer().required().messages({
    "number.base": "作者 ID 必須是數字格式",
    "number.integer": "作者 ID 必須是整數",
    "any.required": "作者 ID 是必填欄位",
  }),
  categoryId: joi.number().integer().allow(null).empty("").optional().messages({
    "number.base": "分類 ID 必須是數字格式",
    "number.integer": "分類 ID 必須是整數",
  }),
});

export const updatePostSchema = joi.object({
  title: joi.string().trim().min(1).max(255).optional().messages({
    "string.base": "標題必須是字串格式",
    "string.empty": "標題不能為空字串",
    "string.min": "標題長度至少需要 {#limit} 個字元",
    "string.max": "標題長度不能超過 {#limit} 個字元",
  }),
  content: joi.string().trim().allow(null, "").optional().messages({
    "string.base": "內容必須是字串格式",
  }),
  categoryId: joi.number().integer().allow(null).empty("").optional().messages({
    "number.base": "分類 ID 必須是數字格式",
    "number.integer": "分類 ID 必須是整數",
  }),
  published: joi.boolean().optional().messages({
    "boolean.base": "發布狀態必須是一個布林值(true/false)",
  }),
});

export const getPostsQuerySchema = joi.object({
  categoryId: joi.number().integer().empty("").optional().messages({
    "number.base": "分類 ID 必須是數字格式",
    "number.integer": "分類 ID 必須是整數",
  }),
  authorId: joi.number().integer().empty("").optional().messages({
    "number.base": "作者 ID 必須是數字格式",
    "number.integer": "作者 ID 必須是整數",
  }),
});

export const postIdParamSchema = joi.object({
  id: joi.number().integer().required().messages({
    "number.base": "文章 ID 必須是數字格式",
    "number.integer": "文章 ID 必須是整數",
  }),
});
