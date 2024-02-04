const express = require("express");
const router = express.Router();
const {
	addComment,
	getCommentsByPostID,
} = require("../controllers/commentController");
const verifyTokenMiddleware = require("../controllers/verifyTokenController");

router.post("/comments", verifyTokenMiddleware, async (req, res) => {
	try {
		let { postID, mediaType, mediaURL, content } = req.body;
		const userID = req.user.userID;
		if (mediaURL && mediaURL.urls && mediaURL.urls.length > 0) {
			mediaURL = mediaURL.urls[0];
		}
		await addComment(userID, postID, mediaType, mediaURL, content);
		res.status(201).json({ message: "Comment added successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});
router.get("/comments/:postID", async (req, res) => {
	try {
		const postID = req.params.postID;
		const comments = await getCommentsByPostID(postID);
		res.status(200).json(comments);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

module.exports = router;
