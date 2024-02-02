const express = require("express");
const multer = require("multer");
const { uploadMedia } = require("../controllers/imgUploadController");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.post("/upload", upload.array("media", 10), uploadMedia); // Allow up to 10 files

module.exports = router;
