const express = require("express");
const router = express.Router();
const { createPost, getAllPosts, getPostById } = require("../controllers/postController");
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

router.get("/posts", async (req, res) => {
	try {
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 10;
		const posts = await getAllPosts(page, limit);
		res.status(200).json(posts);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

router.get("/posts/:id", async (req, res) => {
	const postId = req.params.id;
	const post = await getPostById(postId);
	if (post) {
		res.json(post);
	} else {
		res.status(404).json({ message: "Post not found" });
	}
});
module.exports = router;
