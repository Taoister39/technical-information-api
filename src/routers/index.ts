import express, { Router } from "express";
import loginRouter from "./loginRouter.js";
import userRouter from "./userRouter.js";

const router = Router();

router.use("/api", loginRouter);

router.use("/uploads", express.static("../../public"));

router.use("/user", userRouter);

export default router;
