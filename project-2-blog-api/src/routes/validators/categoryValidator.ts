import joi from "joi";

export const createCategorySchema = joi.object({
  name: joi.string().trim().required().messages({
    "string.base": "name 必須是字串格式",
    "string.empty": "name 不能為空",
    "any.required": "name 是必填欄位",
  }),
});
