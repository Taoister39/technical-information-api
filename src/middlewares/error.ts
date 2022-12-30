import type { ErrorRequestHandler } from "express";
import Joi from "joi";

const errorMiddleware: ErrorRequestHandler = (
  error,
  request,
  response,
  next
) => {
  if (error instanceof Joi.ValidationError) {
    return response.send({ message: error?.message, status: 1 });
  }
  if (error.name === "UnauthorizedError") {
    return response.status(401).send({ message: "未登录，请登录", status: 1 });
  }
  response.send({ message: error?.message, status: 1 });
  next();
};

export default errorMiddleware;
