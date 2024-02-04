const db = require("../config/database");

async function likePost(userID, postID) {
	try {
		const query = "INSERT INTO LIKES (userID, postID) VALUES (?, ?)";
		await db.query(query, [userID, postID]);
	} catch (error) {
		console.error(error);
		throw error;
	}
}

async function dislikePost(userID, postID) {
	try {
		const query = "DELETE FROM LIKES WHERE userID = ? AND postID = ?";
		await db.query(query, [userID, postID]);
	} catch (error) {
		console.error(error);
		throw error;
	}
}

async function hasLiked(userID, postID) {
	try {
		const query = "SELECT * FROM LIKES WHERE userID = ? AND postID = ?";
		const result = await db.query(query, [userID, postID]);
		return result[0].length > 0;
	} catch (error) {
		console.error(error);
		throw error;
	}
}
module.exports = {
	likePost,
	dislikePost,
	hasLiked,
};
