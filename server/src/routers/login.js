const express = require("express");
const { loginController } = require("../controllers/userLoginController");
const verifyTokenMiddleware = require("../controllers/verifyTokenController");

const router = express.Router();

router.post("/login", loginController);
router.get("/checkToken", verifyTokenMiddleware, (req, res) => {
	res.status(200).json(req.user);
});
module.exports = router;
