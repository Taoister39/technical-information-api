import { Router } from "express";
import {
  getArticleHandler,
  getCatesHandler,
  getPublishInfoHandler,
  publishHandler,
  getArticleListHandler,
  isLikeHandler,
  likeHandler,
  getMessageListHandler,
  sendMessageHandler,
  beLikeRankingHandler,
  isStartHandler,
  startHandler,
} from "../handler/article/index.js";
import {
  get_article_list_schema,
  get_article_schema,
} from "../schema/article_schema.js";
import { validate } from "express-validation";
import { expressjwt } from "express-jwt";
import jwtConfig from "../config/jwt.js";
import multer from "multer";

import path from "path";
import { fileURLToPath } from "url";

const articleRouter = Router();

articleRouter.get("/cates", getCatesHandler);

articleRouter.get(
  "/content/:id",
  validate(get_article_schema),
  getArticleHandler
);

const uploadPath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../public"
);
// console.log(uploadPath);

const upload = multer({
  dest: uploadPath,
});

articleRouter.post(
  "/publish",
  expressjwt({
    algorithms: ["HS256"],
    secret: jwtConfig.jwtSecretKey,
  }),
  upload.single("cover"),
  publishHandler
);

articleRouter.get(
  "/list",
  validate(get_article_list_schema),
  getArticleListHandler
);

articleRouter.get("/count/publish", getPublishInfoHandler);

articleRouter.post(
  "/islike",
  expressjwt({
    algorithms: ["HS256"],
    secret: jwtConfig.jwtSecretKey,
  }),
  isLikeHandler
);
articleRouter.post(
  "/like",
  expressjwt({
    algorithms: ["HS256"],
    secret: jwtConfig.jwtSecretKey,
  }),
  likeHandler
);

articleRouter.get("/comment/list", getMessageListHandler);

articleRouter.post(
  "/comment",
  expressjwt({
    algorithms: ["HS256"],
    secret: jwtConfig.jwtSecretKey,
  }),
  sendMessageHandler
);

articleRouter.get("/belike", beLikeRankingHandler);

articleRouter.post(
  "/isstart",
  expressjwt({
    algorithms: ["HS256"],
    secret: jwtConfig.jwtSecretKey,
  }),
  isStartHandler
);

articleRouter.post(
  "/start",
  expressjwt({
    algorithms: ["HS256"],
    secret: jwtConfig.jwtSecretKey,
  }),
  startHandler
);
export default articleRouter;
