const express = require("express");
const {
	getMyProfile,
	updateUserProfileInfo,
	getExistingUser,
	checkCurrentPassword,
	updatePassword,
} = require("../controllers/profileController");
const verifyTokenMiddleware = require("../controllers/verifyTokenController");

const router = express.Router();

router.get("/myProfile", verifyTokenMiddleware, async (req, res) => {
	try {
		const userID = req.user ? req.user.userID : null;
		const userProfile = await getMyProfile(userID);
		if (!userProfile) {
			return res.status(200).json({ message: "No user logged in" });
		}

		res.status(200).json(userProfile);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

router.post("/update-profile-info", verifyTokenMiddleware, async (req, res) => {
	try {
		const userID = req.user.userID;
		const { email, avatar, fullName } = req.body;

		const existingUser = await getExistingUser(email, userID);
		if (existingUser.length > 0) {
			return res.status(409).json({ error: "Email already in use" });
		}

		await updateUserProfileInfo(userID, email, avatar, fullName);

		res.status(200).json({ message: "Profile info updated successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

router.post("/change-password", verifyTokenMiddleware, async (req, res) => {
	try {
		const userID = req.user ? req.user.userID : null;
		const { currentPassword, newPassword, currentEmail } = req.body;

		const isCurrentPasswordCorrect = await checkCurrentPassword(
			userID,
			currentPassword,
			currentEmail
		);

		if (!isCurrentPasswordCorrect) {
			return res.status(400).json({ error: "Current password is incorrect" });
		}

		await updatePassword(userID, newPassword, currentEmail);

		res.status(200).json({ message: "Password updated successfully" });
	} catch (error) {
		console.error(error);
		if (error.message === "User not found") {
			res.status(400).json({ error: "User not found" });
		} else {
			res.status(500).json({ error: "Internal Server Error" });
		}
	}
});
module.exports = router;
