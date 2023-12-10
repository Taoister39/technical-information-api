import type { RequestHandler } from "express";
import HttpSend from "../../types/HttpSend.js";
import mysql from "../../db/mysql.js";
import type { ResultSetHeader } from "mysql2";
import path from "path";

const publishHandler: RequestHandler<
  never,
  HttpSend,
  {
    title: string;
    cate_id: number;
    content: string;
  }
> = async (request, response) => {
  if (request.file == undefined || request.file.fieldname !== "cover") {
    return response.send({ message: "文章封面是必选的参数", status: 1 });
  }

  const sql = "INSERT INTO articles SET ?";
  const { title, cate_id, content } = request.body;

  const [result] = await mysql.query<ResultSetHeader>(sql, {
    title,
    cate_id,
    content,
    cover_url: path.join("/uploads", request.file.filename),
    publish_date: new Date(),
    author_id: request.auth?.id,
  });

  if (result.affectedRows < 1) {
    return response.send({
      message: "发布文章失败",
      status: 1,
    });
  }

  return response.send({ message: "发布文章成功", status: 0 });
};
export default publishHandler;
