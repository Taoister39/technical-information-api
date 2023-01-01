import { RequestHandler } from "express";
import HttpSend from "../../types/HttpSend.js";
import db from "../../db/index.js";

const likeHandler: RequestHandler<
  never,
  HttpSend,
  {
    issue_id: number;
  }
> = async (request, response) => {
  const id = request.body.issue_id;

  const sql =
    "SELECT id,like_issue_id,user_id FROM issue_like WHERE user_id = ? AND like_issue_id = ?";

  const [result] = await db.query(sql, [request.auth?.id, id]);
};

export default likeHandler;
