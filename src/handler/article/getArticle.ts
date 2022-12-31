import { RequestHandler } from "express";
import HttpSend from "../../types/HttpSend.js";
import db from "../../db/index.js";
import type { ArticleData, ArticleRowDataPacket } from "../../types/Data.js";

const getArticleHandler: RequestHandler<
  { id: string },
  HttpSend<ArticleData>
> = async (request, response) => {
  const id = request.params.id;

  const sql =
    "SELECT title,content,cover_url,publish_date,user_name,user_avatar FROM articles,users WHERE articles.id = ? AND users.id = articles.author_id;";

  const [result] = await db.query<ArticleRowDataPacket[]>(sql, id);

  if (result.length < 1) {
    return response.send({ message: "文章不存在", status: 1 });
  }
  return response.send({ message: "获取文章成功", status: 0, data: result[0] });
};

export default getArticleHandler;
