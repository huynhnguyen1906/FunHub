const db = require("../config/database");

async function addMediaToPost(postID, media) {
	try {
		if (!media || !Array.isArray(media) || media.length === 0) {
			return;
		}

		const addMediaQuery = "INSERT INTO MEDIA (postID, type, url) VALUES ?";
		const mediaValues = media.map((m) => [postID, m.type, m.url]);
		await db.query(addMediaQuery, [mediaValues]);
	} catch (error) {
		console.error(error);
		throw error;
	}
}

async function getPostById(postID) {
	try {
		const getPostQuery = "SELECT * FROM POSTS WHERE postID = ?";
		const [post] = await db.query(getPostQuery, [postID]);

		return post.length > 0 ? post[0] : null;
	} catch (error) {
		console.error(error);
		throw error;
	}
}

module.exports = {
	addMediaToPost,
	getPostById,
};
