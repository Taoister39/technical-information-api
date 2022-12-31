import type { RequestHandler } from "express";
import HttpSend from "../../types/HttpSend.js";
import db from "../../db/index.js";
import type { ResultSetHeader } from "mysql2";

const updateInfoHandler: RequestHandler<
  never,
  HttpSend,
  { email: string }
> = async (request, response) => {
  const sql = "UPDATE users SET ? WHERE id = ?";
  const body = request.body;

  const [result] = await db.query<ResultSetHeader>(sql, [
    { user_email: body.email },
    request.auth?.id,
  ]);

  if (result.affectedRows < 1) {
    return response.send({ message: "修改用户基本信息失败", status: 1 });
  }

  return response.send({ status: 0, message: "修改用户基本信息成功" });
};

export default updateInfoHandler;
