import { Router } from "express";
// import loginHandler from "../handler/user/loginHandler.js";
import {
  login_schema,
  register_schema,
} from "../schema/register_login_schema.js";
import { validate } from "express-validation";
import registerHandler from "../handler/login/register.js";
import loginHandler from "../handler/login/login.js";

const loginRouter = Router();

loginRouter.post("/register", validate(register_schema), registerHandler);

loginRouter.post("/login", validate(login_schema), loginHandler);

export default loginRouter;
