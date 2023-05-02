import { createPool } from "mysql2/promise";

const db = createPool({
  host: "db", // 數據庫主機
  user: "root", // 數據庫賬戶名
  database: "technical_information", // 指定數據庫
  port: 3306,
});

export default db;
