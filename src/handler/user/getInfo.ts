import type { RequestHandler } from "express";
import db from "../../db/index.js";

const getInfoHandler: RequestHandler = async (request, response) => {
  const sql = "SELECT user_name,user_email,user_avatar FROM users WHERE id = ?";
  const result = db.query(sql, request.auth?.id);
};

export default getInfoHandler;
