import express, { Router } from "express";
import loginRouter from "./loginRouter.js";
import userRouter from "./userRouter.js";

const router = Router();

router.use("/api", loginRouter);

router.use("/user", userRouter);

router.use("/uploads", express.static("../../public"));

export default router;
