import type { RequestHandler } from "express";
import type HttpSend from "../../types/HttpSend";
import mysql from "../../db/mysql.js";
import bcrypt from "bcryptjs";

import type { ResultSetHeader, RowDataPacket } from "mysql2";

const registerHandler: RequestHandler<
  unknown,
  HttpSend,
  { username: string; password: string; password2: string }
> = async (request, response) => {
  const userInfo = request.body;
  if (userInfo.password !== userInfo.password2) {
    return response.send({ message: "两个密码不一致", status: 1 });
  }
  // console.log(userInfo);

  const queryNameSql = "SELECT * FROM users WHERE user_name = ?";

  const [nameResults] = await mysql.query<RowDataPacket[][]>(queryNameSql, [
    userInfo.username,
  ]);

  if (nameResults.length > 0) {
    return response.send({ message: "用户名已经注册", status: 0 });
  }

  const hashPassword = bcrypt.hashSync(userInfo.password, 10);

  const addInfoSql = "INSERT INTO users SET ?";
  const [addResult] = await mysql.query<ResultSetHeader>(addInfoSql, {
    user_name: userInfo.username,
    user_password: hashPassword,
  });

  if (addResult.affectedRows !== 1) {
    return response.send({ status: 1, message: "注册失败" });
  }

  return response.send({ status: 0, message: "注册成功" });
};
export default registerHandler;
