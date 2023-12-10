import { RequestHandler } from "express";
import mysql from "../../db/mysql.js";
import { RowDataPacket } from "mysql2";
import HttpSend from "../../types/HttpSend.js";

const isLikeHandler: RequestHandler<
  never,
  HttpSend<boolean>,
  {
    issue_id: number;
  }
> = async (request, response) => {
  const { issue_id } = request.body;

  const sql =
    "SELECT id,like_issue_id,user_id FROM issue_like WHERE user_id = ? AND like_issue_id = ?";

  const [result] = await mysql.query<RowDataPacket[]>(sql, [
    request.auth?.id,
    issue_id,
  ]);

  if (result.length >= 1) {
    return response.send({ message: "点赞了", status: 0, data: true });
  }
  return response.send({ message: "没有点赞", status: 0, data: false });
};

export default isLikeHandler;
