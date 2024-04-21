import mysql from "mysql2";

import config from "./config.js";

const pool = mysql.createPool({
  ...config.db.connection,
  waitForConnection: true,
  connectionLimit: 5,
  queueLimit: 0,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.log("err", err);
    console.error("Error connection to the database.", err.sqlMessage);
    return;
  }
  console.info(`Successfully connected to db ${config.db.connection.database}`);
});

export default pool;
