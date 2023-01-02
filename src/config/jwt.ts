import type { Algorithm } from "jsonwebtoken";

const jwtConfig = {
  jwtSecretKey: "Taoister",
  algorithms: ["HS256"] as Algorithm[],
};
export default jwtConfig;
