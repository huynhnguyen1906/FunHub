const express = require("express");
const router = express.Router();
const { createPost } = require("../controllers/postController");
const verifyTokenMiddleware = require("../controllers/verifyTokenController");

router.post("/createPost", verifyTokenMiddleware, async (req, res) => {
	try {
		const { content, media } = req.body;
		const userID = req.user.userID;

		const newPost = await createPost(userID, content, media);

		if (!newPost) {
			return res.status(500).json({ error: "Failed to create post" });
		}

		res.status(201).json(newPost);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

module.exports = router;
