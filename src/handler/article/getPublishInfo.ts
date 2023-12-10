import type { RequestHandler } from "express";
import type HttpSend from "../../types/HttpSend.js";
import mysql from "../../db/mysql.js";
import type { RowDataPacket } from "mysql2";

interface PublishCountData {
  author_id: number;
  user_name: string;
  count: number;
}
interface PublishCountRowData extends RowDataPacket {
  author_id: number;
  user_name: string;
  count: number;
}

const getPublishInfoHandler: RequestHandler<
  never,
  HttpSend<PublishCountData[]>,
  void,
  { type: "moth" | "week" }
> = async (request, response) => {
  const { type } = request.query;
  let sql: string;

  if (type === "moth") {
    sql = `SELECT author_id,user_name,COUNT(*) AS count FROM articles,users
WHERE DATE_SUB(CURDATE(), 
INTERVAL 30 DAY) <= DATE(publish_date) AND users.id = author_id GROUP BY user_name ORDER BY count DESC LIMIT 0,6`;
  } else {
    sql = `SELECT author_id,user_name,COUNT(*) AS count FROM articles,users
where DATE_SUB(CURDATE(), INTERVAL 7 DAY) <= date(publish_date) AND users.id = author_id GROUP BY user_name ORDER By count DESC;`;
  }
  const [result] = await mysql.query<PublishCountRowData[]>(sql);
  return response.send({
    status: 0,
    message: `获取${type == "moth" ? "一个月" : "一周"}内发布文章热度成功`,
    data: result,
  });
};

export default getPublishInfoHandler;
