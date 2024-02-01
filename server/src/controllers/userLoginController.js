const { loginUser, generateToken } = require("../models/userModel");

async function loginController(req, res) {
	try {
		const { usernameOrEmail, password } = req.body;

		const user = await loginUser(usernameOrEmail, password);

		if (!user) {
			return res
				.status(401)
				.json({ error: "Invalid username/email or password" });
		}

		const token = generateToken(user.userID);

		res.cookie("token", token, {
			maxAge: 7 * 24 * 60 * 60 * 1000,
		});

		res.status(200).json({ user });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
}

module.exports = {
	loginController,
};
