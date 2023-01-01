import Joi from "joi";

const id = Joi.number().min(0).required();

const per_page = Joi.number().min(10).required();
const page = Joi.number().min(1).required();
const cate_id = Joi.number().min(1);
const search = Joi.string();

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
