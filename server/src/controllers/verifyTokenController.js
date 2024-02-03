const jwt = require("jsonwebtoken");

const verifyTokenMiddleware = (req, res, next) => {
	const token = req.cookies ? req.cookies.token : null;

	if (token) {
		jwt.verify(token, process.env.LOGIN_TOKEN_KEY, (err, decoded) => {
			if (err) {
				console.log(err);
			} else {
				req.user = decoded;
			}
		});
	}

	next();
};

module.exports = verifyTokenMiddleware;
