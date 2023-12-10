import type { RequestHandler } from "express";
import type HttpSend from "../../types/HttpSend.js";
import mysql from "../../db/mysql.js";
import type { IssuePreviewRowDataPacket } from "../../types/Data.js";

const getIssueHandler: RequestHandler<
  { id: string },
  HttpSend<IssuePreviewRowDataPacket>
> = async (request, response) => {
  const id = Number(request.params.id);

  const sql =
    "SELECT issues.id AS issue_id,title,content,tags,publish_date,user_name,user_avatar,getIssueLikeCount(issues.id) AS like_count FROM issues,users WHERE users.id = author_id AND issues.id = ?";

  const [result] = await mysql.query<IssuePreviewRowDataPacket[]>(sql, id);

  return response.send({ status: 0, message: "获取问答成功", data: result[0] });
};

export default getIssueHandler;
