const db = require("../config/database");
const postModel = require("../models/postModel");

async function createPost(userID, content, media) {
	try {
		await db.beginTransaction();

		const createPostQuery = "INSERT INTO POSTS (userID, content) VALUES (?, ?)";
		const [postResult] = await db.query(createPostQuery, [userID, content]);

		if (postResult && postResult.insertId) {
			const postID = postResult.insertId;
			await postModel.addMediaToPost(postID, media);

			await db.commit();

			return postModel.getPostById(postID);
		} else {
			await db.rollback();
		}

		return null;
	} catch (error) {
		await db.rollback();
		console.error(error);
		throw error;
	} finally {
	}
}

module.exports = {
	createPost,
};
