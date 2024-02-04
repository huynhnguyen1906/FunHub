const db = require("../config/database");

async function addComment(userID, postID, mediaType, mediaURL, content) {
	try {
		const query =
			"INSERT INTO COMMENTS (userID, postID, mediaType, mediaURL, content) VALUES (?, ?, ?, ?, ?)";
		await db.query(query, [userID, postID, mediaType, mediaURL, content]);
	} catch (error) {
		console.error(error);
		throw error;
	}
}
async function getCommentsByPostID(postID) {
	try {
		const query = `
            SELECT 
                COMMENTS.commentID, 
                COMMENTS.content, 
                COMMENTS.create_at, 
                COMMENTS.mediaURL, 
                COMMENTS.mediaType, 
                USERS.userID as userID, 
                USERS.fullName as fullName, 
                USERS.avatar 
            FROM COMMENTS 
            JOIN USERS ON COMMENTS.userID = USERS.userID 
            WHERE COMMENTS.postID = ?
            ORDER BY COMMENTS.create_at DESC`;
		const [rows] = await db.query(query, [postID]);
		return rows.map((row) => ({
			id: row.id,
			user: {
				userID: row.userID,
				fullName: row.fullName,
				avatar: row.avatar,
			},
			content: row.content,
			create_at: row.create_at,
			mediaURL: row.mediaURL,
			mediaType: row.mediaType,
		}));
	} catch (error) {
		console.error(error);
		throw error;
	}
}

module.exports = {
	addComment,
	getCommentsByPostID,
};
