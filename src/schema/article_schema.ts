import Joi from "joi";

const id = Joi.number().min(0).required();

const per_page = Joi.number().min(10).required();
const page = Joi.number().min(1).required();
const cate_id = Joi.number().min(1);
const search = Joi.string();

const content = Joi.string().required();

export const get_article_schema = {
  params: Joi.object({
    id,
  }),
};

export const get_article_list_schema = {
  query: Joi.object({
    per_page,
    page,
    cate_id,
    search,
  }),
};

export const send_message_schema = {
  body: Joi.object({
    content,
    article_id: id,
  }),
};

export const get_message_list_schema = {
  query: Joi.object({
    id,
  }),
};

export const start_schema = {
  body: Joi.object({
    article_id: id,
  }),
};

export const like_schema = {
  body: Joi.object({
    article_id: id,
  }),
};
