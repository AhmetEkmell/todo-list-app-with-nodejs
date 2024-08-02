const dotenv = require("dotenv");

dotenv.config();

const { PORT, HOST, SQL_USER, SQL_PASSWORD, SQL_DATABASE, SQL_SERVER } =
  process.env;

const SQL_ENCRYPT = process.env.SQL_ENCRYPT === "true";

module.exports = {
  port: PORT,
  host: HOST,
  sql: {
    server: SQL_SERVER,
    database: SQL_DATABASE,
    user: SQL_USER,
    password: SQL_PASSWORD,
    options: {
      encrypt: SQL_ENCRYPT,
    },
  },
};
