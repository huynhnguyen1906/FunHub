const db = require("../config/database");
const bcrypt = require("bcrypt");

async function getMyProfile(userID) {
	if (!userID) {
		return null;
	}
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
	let query;
	let values;

	if (userID) {
		query = "SELECT password, email FROM USERS WHERE userID = ?";
		values = [userID];
	} else if (currentEmail) {
		query = "SELECT password, email FROM USERS WHERE email = ?";
		values = [currentEmail];
	} else {
		throw new Error("User identifier not provided");
	}

	const [result] = await db.query(query, values);
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

async function updatePassword(userID, newPassword, currentEmail) {
	const hashedPassword = await bcrypt.hash(newPassword, 10);
	let query;
	let values;

	if (userID) {
		query = "UPDATE USERS SET password = ? WHERE userID = ?";
		values = [hashedPassword, userID];
	} else if (currentEmail) {
		query = "UPDATE USERS SET password = ? WHERE email = ?";
		values = [hashedPassword, currentEmail];
	} else {
		throw new Error("User identifier not provided");
	}

	await db.query(query, values);
}
module.exports = {
	getMyProfile,
	updateUserProfileInfo,
	getExistingUser,
	checkCurrentPassword,
	updatePassword,
};
