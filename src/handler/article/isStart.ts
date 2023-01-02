import { RequestHandler } from "express";
import db from "../../db/index.js";
import { RowDataPacket } from "mysql2";
import HttpSend from "../../types/HttpSend.js";

const isStartHandler: RequestHandler<
  never,
  HttpSend<boolean>,
  {
    article_id: number;
  }
> = async (request, response) => {
  const { article_id } = request.body;

  const sql =
    "SELECT id,start_article_id,user_id FROM article_start WHERE user_id = ? AND start_article_id = ?";

  const [result] = await db.query<RowDataPacket[]>(sql, [
    request.auth?.id,
    article_id,
  ]);

  if (result.length >= 1) {
    return response.send({ message: "收藏了、", status: 0, data: true });
  }
  return response.send({ message: "没有收藏", status: 0, data: false });
};

export default isStartHandler;
