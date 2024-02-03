const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
	connectionLimit: 10,
	queueLimit: 0,
	charset: "utf8mb4",
});

let connection;

async function beginTransaction() {
	connection = await pool.getConnection();
	await connection.beginTransaction();
}

async function commit() {
	await connection.commit();
	connection.release();
}

async function rollback() {
	await connection.rollback();
	connection.release();
}

module.exports = {
	query: pool.query.bind(pool),
	beginTransaction,
	commit,
	rollback,
};
