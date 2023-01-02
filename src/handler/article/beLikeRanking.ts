import { RequestHandler } from "express";
import HttpSend from "../../types/HttpSend.js";
import db from "../../db/index.js";
import { RowDataPacket } from "mysql2";

interface BeLikeRankingArticle {
  was_like_count: number;
  user_name: string;
}
interface BeLikeRankingArticleRow extends BeLikeRankingArticle, RowDataPacket {}

const beLikeRankingHandler: RequestHandler<
  never,
  HttpSend<BeLikeRankingArticle[]>
> = async (request, response) => {
  const sql =
    "SELECT was_like_count,user_name FROM be_like_article_view ORDER BY was_like_count DESC LIMIT 0,4";

  const [result] = await db.query<BeLikeRankingArticleRow[]>(sql);

  return response.send({
    message: "被点赞用户数量成功",
    status: 0,
    data: result,
  });
};

export default beLikeRankingHandler;
