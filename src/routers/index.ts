import express, { Router } from "express";
import loginRouter from "./loginRouter.js";
import userRouter from "./userRouter.js";
import articleRouter from "./articleRouter.js";

import path from "path";
import { fileURLToPath } from "url";
import issueRouter from "./issueRouter.js";

const router = Router();

router.use("/api", loginRouter);

router.use("/user", userRouter);

router.use("/article", articleRouter);

router.use("/issue", issueRouter);

const publicPath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../public"
);
router.use("/uploads", express.static(publicPath));

export default router;
