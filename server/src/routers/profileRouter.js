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
		const userID = req.user.userID;
		const userProfile = await getMyProfile(userID);
		if (!userProfile) {
			return res.status(404).json({ error: "User not found" });
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
		const userID = req.user.userID;
		const { currentEmail, currentPassword, newPassword } = req.body;

		const isUserLegit = await checkCurrentPassword(
			userID,
			currentPassword,
			currentEmail
		);
		if (!isUserLegit) {
			return res
				.status(400)
				.json({ error: "Invalid current email or password" });
		}

		await updatePassword(userID, newPassword);
		res.status(200).json({ message: "Password changed successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});
module.exports = router;
