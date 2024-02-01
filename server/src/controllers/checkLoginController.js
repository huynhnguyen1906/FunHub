const jwt = require("jsonwebtoken");

const verifyTokenMiddleware = (req, res, next) => {
	const token = req.cookies ? req.cookies.token : null;
	if (!token) {
		return res.status(401).json({ error: "No token provided" });
	}

	jwt.verify(token, process.env.LOGIN_TOKEN_KEY, (err, decoded) => {
		if (err) {
			console.log(err);
			return res.status(401).json({ error: "Invalid token" });
		}

		req.user = decoded;
		next();
	});
};
module.exports = verifyTokenMiddleware;
