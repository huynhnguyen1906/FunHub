const express = require("express");
const router = express.Router();

const apiTestRouters = require("./testApi");
const uploadRouters = require("./imgUploadRouters");
const createUserRouters = require("./createUser");
const userLoginRouters = require("./login");
const myProfileRouters = require("./profileRouter");
const createPostRouters = require("./postRouter");

router.use(apiTestRouters);
router.use(uploadRouters);
router.use(createPostRouters);
router.use("/api/user", createUserRouters);
router.use("/api/user", userLoginRouters);
router.use("/api/user", myProfileRouters);

module.exports = router;
