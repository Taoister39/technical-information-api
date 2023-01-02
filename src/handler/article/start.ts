import { RequestHandler } from "express";
import HttpSend from "../../types/HttpSend.js";
import db from "../../db/index.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";

const startHandler: RequestHandler<
  never,
  HttpSend,
  {
    article_id: number;
  }
> = async (request, response) => {
  const id = request.body.article_id;

  const sql =
    "SELECT id,start_article_id,user_id FROM article_start WHERE user_id = ? AND start_article_id = ?";

  const [result] = await db.query<RowDataPacket[]>(sql, [request.auth?.id, id]);

  if (result.length < 1) {
    const sql = "INSERT INTO article_start SET ?";
    const [result] = await db.query<ResultSetHeader>(sql, {
      user_id: request.auth?.id,
      start_article_id: id,
    });
    if (result.affectedRows < 1) {
      return response.send({ message: "收藏失败", status: 1 });
    }
    return response.send({ message: "收藏成功", status: 0 });
  } else {
    const sql =
      "DELETE FROM article_start WHERE user_id = ? AND start_article_id = ?";
    const [result] = await db.query<ResultSetHeader>(sql, [
      request.auth?.id,
      id,
    ]);
    if (result.affectedRows < 1) {
      return response.send({ message: "取消收藏失败", status: 1 });
    }
    return response.send({ message: "取消收藏成功", status: 0 });
  }
};

export default startHandler;
