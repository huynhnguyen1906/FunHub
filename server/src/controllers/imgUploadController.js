const { storage } = require("../config/firebase-config");
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const sharp = require("sharp");

const uploadMedia = async (req, res) => {
	try {
		if (!req.files || !Array.isArray(req.files)) {
			return res.status(400).send("Invalid file upload");
		}

		const uploadPromises = req.files.map(async (file) => {
			const { buffer, originalname, mimetype } = file;
			const isImage = mimetype.startsWith("image/");

			let processedBuffer;
			let newFileName;

			if (isImage) {
				processedBuffer = await sharp(buffer).toFormat("webp").toBuffer();
				newFileName = `${Date.now()}_${originalname.replace(/\.[^/.]+$/, "")}.webp`;
			} else {
				processedBuffer = buffer;
				newFileName = `${Date.now()}_${originalname}`;
			}

			const storageRef = ref(storage, newFileName);
			await uploadBytes(storageRef, processedBuffer, { contentType: mimetype });

			const publicUrl = await getDownloadURL(storageRef);
			return publicUrl;
		});

		const urls = await Promise.all(uploadPromises);
		res.status(200).json({ urls });
	} catch (error) {
		console.error(error);
		res.status(500).send("Internal Server Error");
	}
};

module.exports = {
	uploadMedia,
};
