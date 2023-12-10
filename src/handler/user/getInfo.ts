import mysql from "../../db/mysql.js";

import type { RequestHandler } from "express";
import type HttpSend from "../../types/HttpSend.js";
import type { UserData, UserRowDataPacket } from "../../types/Data.js";

const getInfoHandler: RequestHandler<
  void,
  HttpSend<{
    user_name: string;
    user_avatar: string;
    user_email: string;
  }>
> = async (request, response) => {
  const sql = "SELECT user_name,user_email,user_avatar FROM users WHERE id = ?";
  const [result] = await mysql.query<UserRowDataPacket[]>(
    sql,
    request.auth?.id
  );

  if (result.length < 1) {
    return response.send({ message: "获取信息失败", status: 1 });
  }

  return response.send({
    message: "获取信息成功",
    status: 0,
    data: {
      user_name: result[0].user_name,
      user_avatar: result[0].user_avatar,
      user_email: result[0].user_email,
    },
  });
};

export default getInfoHandler;
