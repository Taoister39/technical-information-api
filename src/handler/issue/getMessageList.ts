import { RequestHandler } from "express";
import HttpSend from "../../types/HttpSend.js";
import mysql from "../../db/mysql.js";
import { IssueMessageListData } from "../../types/Data.js";
import { RowDataPacket } from "mysql2";

interface IssueMessageListRowDataPacke
  extends IssueMessageListData,
    RowDataPacket {}

const getMessageListHandler: RequestHandler<
  never,
  HttpSend<IssueMessageListData[]>,
  void,
  {
    id: string;
  }
> = async (request, response) => {
  const id = Number(request.query.id);

  const sql =
    "SELECT publish_date,content,issue_id,user_name,user_avatar FROM issue_message,users WHERE users.id = user_id AND issue_id = ?";

  const [result] = await mysql.query<IssueMessageListRowDataPacke[]>(sql, id);

  response.send({
    message: "查询成功",
    status: 0,
    data: result,
  });
};

export default getMessageListHandler;
