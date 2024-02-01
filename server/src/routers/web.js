const express = require("express");
const router = express.Router();

const apiTestRouters = require("./testApi");
const uploadRouters = require("./uploadRouters");
const userRouters = require("./user");
const userLoginRouters = require("./login");

router.use(apiTestRouters);
router.use(uploadRouters);
router.use("/api/user", userRouters);
router.use("/api/user", userLoginRouters);

module.exports = router;
