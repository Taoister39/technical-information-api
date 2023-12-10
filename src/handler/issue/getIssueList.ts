import type { RequestHandler } from "express";
import mysql from "../../db/mysql.js";
import type { IssuesData, IssuesRowDataPacket } from "../../types/Data.js";
import type HttpSend from "../../types/HttpSend.js";
import { RowDataPacket } from "mysql2";

interface IssueListApi {
  maxCount: number;
  list: IssuesData[];
}

const getIssueListHandler: RequestHandler<
  never,
  HttpSend<IssueListApi>,
  void,
  {
    per_page: number;
    page: number;
  }
> = async (request, response) => {
  const maxCountSql =
    "SELECT COUNT(*) AS maxCount FROM issues,users WHERE author_id = users.id";
  const [maxCountResult] = await mysql.query<RowDataPacket[]>(maxCountSql);
  const maxCount = maxCountResult[0].maxCount as number;

  const per_page = Number(request.query.per_page);
  const page = Number(request.query.page);

  const start = maxCount < per_page ? maxCount : (page - 1) * per_page;

  const sql =
    "SELECT issues.id AS issue_id,title,content,tags,publish_date,getIssueLikeCount(issues.id) AS like_count FROM issues,users WHERE author_id = users.id ORDER BY issues.id DESC LIMIT ? , ?";

  const [result] = await mysql.query<IssuesRowDataPacket[]>(sql, [
    start,
    per_page,
  ]);

  return response.send({
    status: 0,
    message: "获取问答列表成功",
    data: { list: result, maxCount },
  });
};

export default getIssueListHandler;
