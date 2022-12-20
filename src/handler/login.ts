import { RequestHandler } from "express";

export const login: RequestHandler = (request, response) => {
  response.send({ me: "sda" });
};
