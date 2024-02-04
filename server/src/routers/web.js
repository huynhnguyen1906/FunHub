const express = require("express");
const router = express.Router();

// const apiTestRouters = require("./testApi");
const uploadRouters = require("./imgUploadRouters");
const createUserRouters = require("./createUser");
const userLoginRouters = require("./login");
const myProfileRouters = require("./profileRouter");
const postRouters = require("./postRouter");
const commentRouters = require("./commentRouter");
const likeRouters = require("./likeRouter");

// router.use(apiTestRouters);
router.use(uploadRouters);
router.use(postRouters);
router.use(commentRouters);
router.use("/api/user", createUserRouters);
router.use("/api/user", userLoginRouters);
router.use("/api/user", myProfileRouters);
router.use("/post", likeRouters);

module.exports = router;
