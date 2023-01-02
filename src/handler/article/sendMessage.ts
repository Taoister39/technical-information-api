import type { RequestHandler } from "express";
import type HttpSend from "../../types/HttpSend.js";
import db from "../../db/index.js";
import { ResultSetHeader } from "mysql2";

const sendMessageHandler: RequestHandler<
  never,
  HttpSend,
  {
    content: string;
    article_id: number;
  }
> = async (request, response) => {
  const { content, article_id } = request.body;

  const sql = "INSERT INTO article_message SET ?";
  const [result] = await db.query<ResultSetHeader>(sql, {
    content,
    article_id,
    publish_date: new Date(),
    user_id: request.auth?.id,
  });

  if (result.affectedRows < 1) {
    return response.send({ message: "发送失败", status: 1 });
  }

  return response.send({ message: "发送成功", status: 0 });
};

export default sendMessageHandler;
