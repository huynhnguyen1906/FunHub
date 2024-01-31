const express = require("express");
const router = express.Router();

const uploadRouters = require("./uploadRouters");
const apiTestRouters = require("./testApi");

router.use(apiTestRouters);
router.use(uploadRouters);

module.exports = router;
