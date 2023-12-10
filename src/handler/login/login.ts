import mysql from "../../db/mysql.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import type { RequestHandler } from "express";
import type HttpSend from "../../types/HttpSend.js";
import type { RowDataPacket } from "mysql2";
import jwtConfig from "../../config/jwt.js";

interface ByNameQueryData extends RowDataPacket {
  user_name: string;
  user_password: string;
  user_email: string;
  user_avatar: string;
  id: number;
}

export const loginHandler: RequestHandler<
  unknown,
  HttpSend<{ username: string; avatar: string; email: string; token: string }>,
  {
    username: string;
    password: string;
  }
> = async (request, response) => {
  const userInfo = request.body;

  const verifySql = `SELECT id,user_name,user_password,user_email,user_avatar FROM users WHERE user_name = ?`;
  //
  const [nameResult] = await mysql.query<ByNameQueryData[]>(verifySql, [
    userInfo.username,
  ]);

  if (nameResult.length < 1) {
    return response.send({ message: "该账号未注册，请注册", status: 1 });
  }

  const compareResutlt = bcrypt.compareSync(
    userInfo.password,
    nameResult[0].user_password
  );
  if (!compareResutlt) {
    return response.send({ message: "密码错误，请重新输入", status: 1 });
  }

  const userPayload: ByNameQueryData = {
    ...nameResult[0],
    user_password: "",
    user_avatar: "",
    user_email: "",
  };
  const tokenString = jwt.sign(userPayload, jwtConfig.jwtSecretKey, {
    expiresIn: "10h", // 10小时有效
  });

  return response.send({
    message: "登录成功",
    status: 0,
    data: {
      username: nameResult[0].user_name,
      email: nameResult[0].user_email,
      avatar: nameResult[0].user_avatar,
      token: tokenString,
    },
  });
};

export default loginHandler;
