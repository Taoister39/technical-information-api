import type { Algorithm } from "jsonwebtoken";

const jwtConfig = {
  jwtSecretKey: process.env.jwtSecretKey ?? "normal",
  algorithms: ["HS256"] as Algorithm[],
};
export default jwtConfig;
