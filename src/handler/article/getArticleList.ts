import { RequestHandler } from "express";
import HttpSend from "../../types/HttpSend.js";
import db from "../../db/index.js";
import { RowDataPacket } from "mysql2";

interface ArticleListData {
  article_id: number;
  title: string;
  content: string;
  cover_url: string;
  publish_date: string;
  cate_id: number;
  author_id: number;
  user_name: string;
  user_avatar: string;
}

interface ArticleListApi {
  list: ArticleListData[];
  maxCount: number;
}

interface ArticleListDataRow extends RowDataPacket {
  article_id: number;
  title: string;
  content: string;
  cover_url: string;
  publish_date: string;
  cate_id: number;
  author_id: number;
  user_name: string;
  user_avatar: string;
}

const getArticleListHandler: RequestHandler<
  never,
  HttpSend<ArticleListApi>,
  void,
  {
    per_page: string;
    page: string;
  }
> = async (request, response) => {
  const { per_page, page } = request.query;

  const maxCountSql = "SELECT COUNT(*) AS maxCount FROM articles";
  const [maxCountResult] = await db.query<RowDataPacket[]>(maxCountSql);

  const maxCount = maxCountResult[0].maxCount as number;

  const start = (Number(page) - 1) * Number(per_page);
  const step = Number(per_page) > maxCount ? maxCount : Number(per_page);

  //   console.log(step);

  const sql =
    "SELECT author_id,articles.id AS article_id,title,cover_url,user_avatar,publish_date,user_name FROM articles,users WHERE users.id = articles.author_id LIMIT ? , ?";
  const [result] = await db.query<ArticleListDataRow[]>(sql, [start, step]);

  return response.send({
    message: "获取文章列表成功",
    status: 0,
    data: { list: result, maxCount },
  });
};

export default getArticleListHandler;
