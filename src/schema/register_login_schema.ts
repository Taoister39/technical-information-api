import Joi from "joi";
import type { StringSchema } from "joi";

const username: StringSchema = Joi.string()
  .alphanum()
  .min(1)
  .max(10)
  .required();

const password: StringSchema = Joi.string().required();

export const register_schema = {
  body: Joi.object({
    username,
    password,
    password2: password,
  }),
};

export const login_schema = {
  body: Joi.object({
    username,
    password,
  }),
};
