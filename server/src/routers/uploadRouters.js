const express = require("express");
const multer = require("multer");
const { uploadMedia } = require("../controllers/uploadController");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.post("/upload", upload.single("media"), uploadMedia);

module.exports = router;
