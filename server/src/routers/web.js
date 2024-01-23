const express = require("express");
const router = express.Router();

// Define your routes here
router.get("/api", (req, res) => {
	res.send("Hello from SERVER");
});
module.exports = router;
