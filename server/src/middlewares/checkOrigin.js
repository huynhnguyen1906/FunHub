const path = require("path");

function checkOrigin(req, res, next) {
	if (!req.headers.referer) {
		return res.status(403).sendFile(path.join(__dirname, "../public/index.html"));
	}
	next();
}

module.exports = checkOrigin;
