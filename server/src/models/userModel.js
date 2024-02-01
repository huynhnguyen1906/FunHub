const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const db = require("../config/database");

async function loginUser(usernameOrEmail, password) {
	try {
		const query = "SELECT * FROM USERS WHERE userName = ? OR email = ?";
		const [user] = await db.query(query, [usernameOrEmail, usernameOrEmail]);

		if (user.length === 0) {
			return null;
		}

		const isPasswordValid = await bcrypt.compare(password, user[0].password);
		if (!isPasswordValid) {
			return null;
		}

		return user[0];
	} catch (error) {
		console.error(error);
		throw error;
	}
}

function generateToken(user) {
	const userWithoutPassword = { ...user };
	delete userWithoutPassword.password;
	return jwt.sign(userWithoutPassword, process.env.LOGIN_TOKEN_KEY, {
		expiresIn: "1w",
	});
}

module.exports = {
	loginUser,
	generateToken,
};
