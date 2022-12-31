import Joi from "joi";

const avatar = Joi.string().dataUri().required();

const password = Joi.string().required();
const email = Joi.string().required();

export const update_userinfo_schema = {
  body: Joi.object({
    email,
  }),
};

export const update_avatar_schema = {
  body: Joi.object({
    avatar,
  }),
};

export const update_password_schema = {
  body: Joi.object({
    oldPwd: password,
    newPwd: password,
  }),
};
