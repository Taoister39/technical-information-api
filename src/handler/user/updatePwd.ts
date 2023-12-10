import type { RequestHandler } from "express";
import bcryptjs from "bcryptjs";
import mysql from "../../db/mysql.js";
import type HttpSend from "../../types/HttpSend.js";
import { UserRowDataPacket } from "../../types/Data.js";
import { ResultSetHeader } from "mysql2";

interface UpdatePwdBody {
  oldPwd: string;
  newPwd: string;
}

const updatePwdHandler: RequestHandler<never, HttpSend, UpdatePwdBody> = async (
  request,
  response
) => {
  const querySql = "SELECT * FROM users WHERE id = ?";

  const [queryResult] = await mysql.query<UserRowDataPacket[]>(
    querySql,
    request.auth?.id
  );

  const compareResult = bcryptjs.compareSync(
    request.body.oldPwd,
    queryResult[0].user_password
  );

  if (!compareResult) {
    return response.send({ status: 1, message: "原密码错误" });
  }

  const newPwdHash = bcryptjs.hashSync(request.body.newPwd, 10);

  const updateSql = "UPDATE users SET user_password = ? WHERE id = ?";
  const [updateResult] = await mysql.query<ResultSetHeader>(updateSql, [
    newPwdHash,
    request.auth?.id,
  ]);

  if (updateResult.affectedRows < 1) {
    return response.send({ status: 1, message: "更新密码失败" });
  }

  return response.send({ status: 0, message: "更新密码成功" });
};

export default updatePwdHandler;
