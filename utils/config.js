const mysql = require('mysql');

// ------ MySqlの接続 ------ //
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_NAME,
});

module.exports = {
  pool,
};
