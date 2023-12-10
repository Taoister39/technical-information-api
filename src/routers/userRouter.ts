import { Router } from "express";
import {
  getArticleStarHandler,
  getInfoHandler,
  updateAvatarHandler,
  updateInfoHandler,
  updatePwdHandler,
} from "../handler/user/index.js";
import { validate } from "express-validation";
import {
  get_article_star_schema,
  update_avatar_schema,
  update_password_schema,
  update_userinfo_schema,
} from "../schema/user_schema.js";

const userRouter = Router();

userRouter.get("/userinfo", getInfoHandler);

userRouter.post(
  "/update/avatar",
  validate(update_avatar_schema),
  updateAvatarHandler
);

userRouter.post(
  "/update/password",
  validate(update_password_schema),
  updatePwdHandler
);

userRouter.post(
  "/update/userinfo",
  validate(update_userinfo_schema),
  updateInfoHandler
);

userRouter.get(
  "/article/star",
  validate(get_article_star_schema),
  getArticleStarHandler
);

export default userRouter;
