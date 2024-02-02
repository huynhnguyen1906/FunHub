const db = require("../config/database");

async function getMyProfile(userID) {
	try {
		const userQuery =
			"SELECT userID, userName, email, fullName, avatar, create_at FROM USERS WHERE userID = ?";
		const [userResult] = await db.query(userQuery, [userID]);
		const user = userResult[0];
		if (user.length === 0) {
			return null; // Người dùng không tồn tại
		}

		// Số lượng bài viết
		const postsCountQuery =
			"SELECT COUNT(*) AS postsCount FROM POSTS WHERE userID = ?";
		const [postsCountResult] = await db.query(postsCountQuery, [userID]);
		const postsCount = postsCountResult[0].postsCount;

		const followingCountQuery =
			"SELECT COUNT(*) AS followingCount FROM FOLLOWS WHERE followerUserID = ?";
		const [followingCountResult] = await db.query(followingCountQuery, [
			userID,
		]);
		const followingCount = followingCountResult[0].followingCount;

		const followerCountQuery =
			"SELECT COUNT(*) AS followerCount FROM FOLLOWS WHERE followingUserID = ?";
		const [followerCountResult] = await db.query(followerCountQuery, [userID]);
		const followerCount = followerCountResult[0].followerCount;

		return {
			user,
			postsCount,
			followingCount,
			followerCount,
		};
	} catch (error) {
		console.error(error);
		throw error;
	}
}

module.exports = {
	getMyProfile,
};
