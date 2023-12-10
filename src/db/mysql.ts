import { createPool } from "mysql2/promise";

const mysql = createPool({
  host: process.env.mysqlHost, // 數據庫主機 - docker网络使用compose主机
  user: process.env.mysqlUser, // 數據庫賬戶名
  database: process.env.mysqlDatabase, // 指定數據庫
  port: Number(process.env.mysqlPort), // docker网络就不用使用映射后的地址，网络不隔离的3306
  password: process.env.mysqlPassword,
});

export default mysql;
