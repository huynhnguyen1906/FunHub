const path = require("path");

function checkOrigin(req, res, next) {
	// Kiểm tra nếu không có header Referer và đường dẫn bắt đầu bằng /api
	if (!req.headers.referer && req.path.startsWith("/api")) {
		return res.status(403).sendFile(path.join(__dirname, "../public/index.html"));
	}
	next();
}

module.exports = checkOrigin;
