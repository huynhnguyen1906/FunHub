const express = require("express");
const router = express.Router();

const apiTestRouters = require("./testApi");
const uploadRouters = require("./imgUploadRouters");
const userRouters = require("./createUser");
const userLoginRouters = require("./login");
const myProfileRouters = require("./myProfileRouter");

router.use(apiTestRouters);
router.use(uploadRouters);
router.use("/api/user", userRouters);
router.use("/api/user", userLoginRouters);
router.use("/api/user", myProfileRouters);

module.exports = router;
