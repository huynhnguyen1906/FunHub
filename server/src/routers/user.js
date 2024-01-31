const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const db = require("../config/database");

router.post("/signup", async (req, res) => {
	try {
		const { userName, password, email, fullName } = req.body;

		const existingUserQuery =
			"SELECT * FROM USERS WHERE userName = ? OR email = ?";
		const [existingUser] = await db.query(existingUserQuery, [userName, email]);
		const result = await db.query(existingUserQuery, [userName, email]);
		console.log(result);
		if (existingUser.length > 0) {
			console.log(existingUser);
			console.log("Conflict: Username or email already exists");
			return res
				.status(409)
				.json({ error: "Username or email already exists" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const createUserQuery =
			"INSERT INTO USERS (userName, password, email, fullName) VALUES (?, ?, ?, ?)";
		await db.query(createUserQuery, [
			userName,
			hashedPassword,
			email,
			fullName,
		]);

		res.status(201).json({ message: "User created successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

module.exports = router;
