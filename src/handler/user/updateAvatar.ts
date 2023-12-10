import type { RequestHandler } from "express";
import type HttpSend from "../../types/HttpSend.js";
import mysql from "../../db/mysql.js";
import type { ResultSetHeader } from "mysql2";

const updateAvatarHandler: RequestHandler<
  never,
  HttpSend,
  { avatar: string }
> = async (request, response) => {
  const sql = "UPDATE users SET user_avatar = ? WHERE id = ?";

  const avatar = request.body.avatar;

  const [result] = await mysql.query<ResultSetHeader>(sql, [
    avatar,
    request.auth?.id,
  ]);

  if (result.affectedRows < 1) {
    return response.send({
      status: 1,
      message: "更新头像失败",
    });
  }
  return response.send({
    status: 0,
    message: "更新头像成功",
  });
};

export default updateAvatarHandler;
