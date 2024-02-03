const db = require("../config/database");
const bcrypt = require("bcrypt");

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

async function updateUserProfileInfo(userID, email, avatar, fullName) {
	try {
		const query =
			"UPDATE USERS SET email = ?, avatar = ?, fullName = ? WHERE userID = ?";
		await db.query(query, [email, avatar, fullName, userID]);
	} catch (error) {
		console.error(error);
		throw error;
	}
}
async function getExistingUser(email, userID) {
	const query = "SELECT * FROM USERS WHERE email = ? AND userID != ?";
	const result = await db.query(query, [email, userID]);
	return result[0];
}

async function checkCurrentPassword(userID, currentPassword, currentEmail) {
	const query = "SELECT password, email FROM USERS WHERE userID = ?";
	const [result] = await db.query(query, [userID]);
	const user = result[0];
	if (!user) {
		throw new Error("User not found");
	}

	const isPasswordMatch = currentPassword
		? await bcrypt.compare(currentPassword, user.password)
		: false;
	const isEmailMatch = currentEmail ? currentEmail === user.email : false;
	return isPasswordMatch || isEmailMatch;
}

async function updatePassword(userID, newPassword) {
	const hashedPassword = await bcrypt.hash(newPassword, 10);
	const query = "UPDATE USERS SET password = ? WHERE userID = ?";
	await db.query(query, [hashedPassword, userID]);
}
module.exports = {
	getMyProfile,
	updateUserProfileInfo,
	getExistingUser,
	checkCurrentPassword,
	updatePassword,
};
