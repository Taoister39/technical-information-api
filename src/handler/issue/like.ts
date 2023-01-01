import { RequestHandler } from "express";
import HttpSend from "../../types/HttpSend.js";
import db from "../../db/index.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { IssueLikeData } from "../../types/Data.js";

interface IssueLikeRowData extends IssueLikeData, RowDataPacket {}

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

  const [result] = await db.query<IssueLikeRowData[]>(sql, [
    request.auth?.id,
    id,
  ]);

  if (result.length < 1) {
    const sql = "INSERT INTO issue_like SET ?";
    const [result] = await db.query<ResultSetHeader>(sql, {
      user_id: request.auth?.id,
      like_issue_id: id,
    });
    if (result.affectedRows < 1) {
      return response.send({ message: "点赞失败", status: 1 });
    }
    return response.send({ message: "点赞成功", status: 0 });
  } else {
    const sql =
      "DELETE FROM issue_like WHERE  user_id = ? AND like_issue_id = ?";
    const [result] = await db.query<ResultSetHeader>(sql, [
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
