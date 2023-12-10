import { RequestHandler } from "express";
import HttpSend from "../../types/HttpSend.js";
import mysql from "../../db/mysql.js";
import {
  ArticleMessageListData,
  IssueMessageListData,
} from "../../types/Data.js";
import { RowDataPacket } from "mysql2";

interface ArticleMessageListRowDataPacke
  extends ArticleMessageListData,
    RowDataPacket {}

const getMessageListHandler: RequestHandler<
  never,
  HttpSend<ArticleMessageListData[]>,
  void,
  {
    id: string;
  }
> = async (request, response) => {
  const id = Number(request.query.id);

  const sql =
    "SELECT publish_date,content,article_id,user_name,user_avatar FROM article_message,users WHERE users.id = user_id AND article_id = ?";

  const [result] = await mysql.query<ArticleMessageListRowDataPacke[]>(sql, id);

  response.send({
    message: "查询成功",
    status: 0,
    data: result,
  });
};

export default getMessageListHandler;
