import { Router } from "express";
import {
  getIssueHandler,
  getIssueListHandler,
  publishHandler,
  sendMessageHandler,
  getMessageListHandler,
  isLikeHandler,
  likeHandler,
} from "../handler/issue/index.js";
import { validate } from "express-validation";
import {
  get_issue_schema,
  get_message_list_schema,
  like_schema,
  publish_schema,
  send_message_schema,
} from "../schema/issue_schema.js";
import { expressjwt } from "express-jwt";
import jwtConfig from "../config/jwt.js";

const issueRouter = Router();

issueRouter.get("/list", getIssueListHandler);

issueRouter.get("/content/:id", validate(get_issue_schema), getIssueHandler);

issueRouter.post(
  "/publish",
  expressjwt({
    algorithms: jwtConfig.algorithms,
    secret: jwtConfig.jwtSecretKey,
  }),
  validate(publish_schema),
  publishHandler
);

issueRouter.post(
  "/comment",
  expressjwt({
    algorithms: jwtConfig.algorithms,
    secret: jwtConfig.jwtSecretKey,
  }),
  validate(send_message_schema),
  sendMessageHandler
);

issueRouter.get(
  "/comment/list",
  validate(get_message_list_schema),
  getMessageListHandler
);

issueRouter.post(
  "/islike",
  expressjwt({
    algorithms: jwtConfig.algorithms,
    secret: jwtConfig.jwtSecretKey,
  }),
  isLikeHandler
);
issueRouter.post(
  "/like",
  expressjwt({
    algorithms: jwtConfig.algorithms,
    secret: jwtConfig.jwtSecretKey,
  }),
  validate(like_schema),
  likeHandler
);

export default issueRouter;
