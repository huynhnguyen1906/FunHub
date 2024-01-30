const mysql = require("mysql2/promise");
require("dotenv").config();

const connection = mysql.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
	connectionLimit: 10,
	queueLimit: 0,
	charset: "utf8mb4",
});

module.exports = connection;
