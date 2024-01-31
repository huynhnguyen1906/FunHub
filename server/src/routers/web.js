const express = require("express");
const router = express.Router();

const uploadRouters = require("./uploadRouters");
const apiTestRouters = require("./testApi");
const userRouters = require("./user");

router.use(apiTestRouters);
router.use(uploadRouters);
router.use("/api/user", userRouters);

module.exports = router;
