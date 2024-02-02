const express = require("express");
const { getMyProfile } = require("../controllers/getMyProfileController");
const verifyTokenMiddleware = require("../controllers/checkLoginController");

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

module.exports = router;
