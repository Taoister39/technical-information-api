import Joi from "joi";

const id = Joi.number().required().min(1);

const title = Joi.string().required();
const content = Joi.string().required();
const tags = Joi.string();

const per_page = Joi.number().required().min(10);
const page = Joi.number().required().min(1);

export const get_issue_schema = {
  params: Joi.object({
    id,
  }),
};

export const publish_schema = {
  body: Joi.object({
    title,
    content,
    tags,
  }),
};
export const get_issue_list_schema = {
  query: Joi.object({
    per_page,
    page,
  }),
};

export const send_message_schema = {
  body: Joi.object({
    content,
    issue_id: id,
  }),
};

export const get_message_list_schema = {
  query: Joi.object({
    id,
  }),
};

export const like_schema = {
  body: Joi.object({
    issue_id: id,
  }),
};
