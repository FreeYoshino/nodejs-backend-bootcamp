import joi from "joi";

export const createUserSchema = joi.object({
  name: joi.string().trim().required().messages({
    "string.base": "name 必須是字串格式",
    "string.empty": "name 不能為空",
    "any.required": "name 是必填欄位",
  }),

  email: joi.string().trim().email().required().messages({
    "string.base": "email 必須是字串格式",
    "string.empty": "email 不能為空",
    "string.email": "email 必須是有效的電子郵件地址",
    "any.required": "email 是必填欄位",
  }),
});
