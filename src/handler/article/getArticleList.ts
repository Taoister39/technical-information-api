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
    cate_id?: string;
    search?: string;
  }
> = async (request, response) => {
  const per_page = Number(request.query.per_page);
  const page = Number(request.query.page);
  const cate_id = Number(request.query.cate_id);
  const search = request.query.search;

  const maxCountSql = `SELECT COUNT(*) AS maxCount FROM articles,users WHERE articles.author_id = users.id${
    cate_id > 3 ? " AND cate_id = " + cate_id : ""
  }${search !== undefined ? " AND title LIKE '%" + search + "%'" : ""}`;
  const [maxCountResult] = await db.query<RowDataPacket[]>(maxCountSql);

  const maxCount = maxCountResult[0].maxCount as number;

  const start = (page - 1) * per_page;
  const step = per_page > maxCount ? maxCount : per_page;

  //   console.log(step);

  const sql = `SELECT author_id,articles.id AS article_id,title,cover_url,user_avatar,publish_date,user_name FROM articles,users WHERE users.id = articles.author_id${
    cate_id > 3 ? " AND cate_id = " + cate_id : ""
  }${
    search !== undefined ? " AND title LIKE '%" + search + "%'" : ""
  } ORDER By article_id DESC LIMIT ? , ?`;
  const [result] = await db.query<ArticleListDataRow[]>(sql, [start, step]);

  return response.send({
    message: "获取文章列表成功",
    status: 0,
    data: { list: result, maxCount },
  });
};

export default getArticleListHandler;
