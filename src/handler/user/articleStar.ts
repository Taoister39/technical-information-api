import { RequestHandler } from "express";
import mysql from "../../db/mysql.js";
import HttpSend from "../../types/HttpSend.js";
import { RowDataPacket } from "mysql2";

export interface UserArticleStarRowDataPacket
  extends UserArticleStarData,
    RowDataPacket {}
export interface UserArticleStarData {
  user_id: number;
  title: string;
  cover_url: string;
  publish_date: string;
  author: string;
  avatar: string;
  cate: string;
  like_count: string;
  comment_count: string;
  star_count: string;
  start_article_id: number;
}
export interface UserArticleLikeApi {
  list: UserArticleStarData[];
  maxCount: number;
}

const getArticleStarHandler: RequestHandler<
  never,
  HttpSend<UserArticleLikeApi>,
  void,
  {
    per_page: string;
    page: string;
  }
> = async (request, response) => {
  const per_page = Number(request.query.per_page);
  const page = Number(request.query.page);

  const [maxCountResult] = await mysql.query<RowDataPacket[]>(
    "SELECT COUNT(*) AS maxCount FROM article_start, articles WHERE articles.id = article_start.start_article_id AND user_id = ?",
    [request.auth!.id]
  );
  const maxCount = maxCountResult[0].maxCount as number;

  const start = (page - 1) * per_page;
  const step = per_page > maxCount ? maxCount : per_page;

  const sql =
    "SELECT user_id, title, cover_url, publish_date, (SELECT user_name FROM users WHERE users.id = author_id) AS author, (SELECT user_avatar FROM users WHERE users.id = author_id) AS avatar,(SELECT name FROM article_cate WHERE article_cate.id = cate_id) AS cate, getArticleLikeCount(start_article_id) AS like_count, getArticleCommentCount(start_article_id) AS comment_count, getArticleStartCount(start_article_id) AS star_count, start_article_id FROM article_start, articles WHERE articles.id = article_start.start_article_id AND user_id = ? ORDER BY article_start.id DESC LIMIT ? , ?";

  const [result] = await mysql.query<UserArticleStarRowDataPacket[]>(sql, [
    request.auth!.id,
    start,
    step,
  ]);

  if (result.length < 1) {
    return response.send({ message: "获取用户收藏文章失败", status: 1 });
  }

  return response.send({
    message: "获取用户收藏文章成功",
    status: 0,
    data: {
      list: result,
      maxCount: maxCount,
    },
  });
};
export default getArticleStarHandler;
