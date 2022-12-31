import { Router } from "express";
import {
  getInfoHandler,
  updateAvatarHandler,
  updateInfoHandler,
  updatePwdHandler,
} from "../handler/user/index.js";
import { validate } from "express-validation";
import {
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

export default userRouter;
