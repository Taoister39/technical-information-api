import { RequestHandler } from "express";
import HttpSend from "../../types/HttpSend.js";
import mysql from "../../db/mysql.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { ArticleLikeData } from "../../types/Data.js";

interface ArticleLikeRowData extends ArticleLikeData, RowDataPacket {}

const likeHandler: RequestHandler<
  never,
  HttpSend,
  {
    article_id: number;
  }
> = async (request, response) => {
  const id = request.body.article_id;

  const sql =
    "SELECT id,like_article_id,user_id FROM article_like WHERE user_id = ? AND like_article_id = ?";

  const [result] = await mysql.query<ArticleLikeRowData[]>(sql, [
    request.auth?.id,
    id,
  ]);

  if (result.length < 1) {
    const sql = "INSERT INTO article_like SET ?";
    const [result] = await mysql.query<ResultSetHeader>(sql, {
      user_id: request.auth?.id,
      like_article_id: id,
    });
    if (result.affectedRows < 1) {
      return response.send({ message: "点赞失败", status: 1 });
    }
    return response.send({ message: "点赞成功", status: 0 });
  } else {
    const sql =
      "DELETE FROM article_like WHERE user_id = ? AND like_article_id = ?";
    const [result] = await mysql.query<ResultSetHeader>(sql, [
      request.auth?.id,
      id,
    ]);
    if (result.affectedRows < 1) {
      return response.send({ message: "取消点赞失败", status: 1 });
    }
    return response.send({ message: "取消点赞成功", status: 0 });
  }
};

export default likeHandler;
