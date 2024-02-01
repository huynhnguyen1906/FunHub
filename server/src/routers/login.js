const express = require("express");
const { loginController } = require("../controllers/userLoginController");

const router = express.Router();

router.post("/login", loginController);

module.exports = router;
