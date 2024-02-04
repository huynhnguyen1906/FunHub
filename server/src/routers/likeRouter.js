const express = require("express");
const router = express.Router();
const {
	likePost,
	dislikePost,
	hasLiked,
} = require("../controllers/likeController");

router.post("/like", async (req, res) => {
	try {
		const { userID, postID, action } = req.body;
		if (action === "like") {
			await likePost(userID, postID);
			res.status(200).send({ message: "Post liked successfully" });
		} else if (action === "dislike") {
			await dislikePost(userID, postID);
			res.status(200).send({ message: "Post disliked successfully" });
		} else {
			res.status(400).send({ message: "Invalid action" });
		}
	} catch (error) {
		res
			.status(500)
			.send({ message: "An error occurred while processing the request" });
	}
});

router.get("/hasLiked", async (req, res) => {
	try {
		const { userID, postID } = req.query;
		const result = await hasLiked(userID, postID);
		res.status(200).send({ hasLiked: result });
	} catch (error) {
		res
			.status(500)
			.send({ message: "An error occurred while checking the like status" });
	}
});

module.exports = router;
