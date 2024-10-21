const path = require("path");

function checkOrigin(req, res, next) {
	if (req.headers.origin) {
		return res.status(403).sendFile(path.join(__dirname, "../public/index403.html"));
	}
	next();
}

module.exports = checkOrigin;
