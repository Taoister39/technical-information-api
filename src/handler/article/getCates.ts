import type { RequestHandler } from "express";
import type HttpSend from "../../types/HttpSend.js";
import db from "../../db/index.js";
import type {
  ArticleCateData,
  ArticleCateRowDataPacket,
} from "../../types/Data.js";

const getCatesHandler: RequestHandler<
  never,
  HttpSend<ArticleCateData[]>
> = async (request, response) => {
  const sql = "SELECT id,name FROM article_cate";

  const [result] = await db.query<ArticleCateRowDataPacket[]>(sql);

  return response.send({
    status: 0,
    message: "获取文章分类成功",
    data: result,
  });
};

export default getCatesHandler;
