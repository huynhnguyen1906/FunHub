const express = require("express");
const router = express.Router();

const apiTestRouters = require("./testApi");

router.use(apiTestRouters);

module.exports = router;
