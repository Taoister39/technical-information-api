import express from "express";
import cors from "cors";
import { expressjwt } from "express-jwt";

import router from "./routers/index.js";
import errorMiddleware from "./middlewares/error.js";
import jwtConfig from "./config/jwt.js";

const app = express();
// 跨域
app.use(cors());
// 解析体
app.use(express.urlencoded({ extended: false }));
// 使用jwt中间件
app.use(
  expressjwt({
    secret: jwtConfig.jwtSecretKey, // 密钥
    algorithms: jwtConfig.algorithms, // 算法
  }).unless({
    path: [/^\/api\//, /^\/article\//, /^\/uploads\//, /^\/issue\//],
  })
);
// 错误处理
app.use(errorMiddleware);

app.use(router);

app.listen(3939, () => {
  console.log(`Server start on http://localhost:3939`);
});
