import type { RequestHandler } from "express";
import HttpSend from "../../types/HttpSend.js";
import mysql from "../../db/mysql.js";
import type { ResultSetHeader } from "mysql2";

const publishHandler: RequestHandler<
  never,
  HttpSend,
  {
    title: string;
    content: string;
    tags: string;
  }
> = async (request, response) => {
  const { title, content, tags } = request.body;

  const sql = "INSERT INTO issues SET ?";

  const [result] = await mysql.query<ResultSetHeader>(sql, {
    title,
    content,
    publish_date: new Date(),
    author_id: request.auth?.id,
    tags,
  });
  if (result.affectedRows < 1) {
    return response.send({ message: "发布失败", status: 1 });
  }
  return response.send({ message: "发布成功", status: 0 });
};

export default publishHandler;
