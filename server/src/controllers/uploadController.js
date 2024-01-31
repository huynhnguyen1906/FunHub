const multer = require("multer");
const sharp = require("sharp");
const { Storage } = require("@google-cloud/storage");
const path = require("path");

const storageClient = new Storage({
	keyFilename: "./funhub-keyfile.json",
});
const bucket = storageClient.bucket("funhub");

const uploadMedia = async (req, res) => {
	try {
		if (!req.file || !(req.file.buffer instanceof Buffer)) {
			return res.status(400).send("Invalid file upload");
		}
		const { buffer, originalname, mimetype } = req.file;
		const isImage = mimetype.startsWith("image/");

		let processedBuffer;
		let newFileName;
		let contentType;

		if (isImage) {
			try {
				processedBuffer = await sharp(buffer).toFormat("webp").toBuffer();
			} catch (error) {
				console.error("Error processing image:", error); // Log any errors from sharp
			}
			newFileName = `${Date.now()}_${originalname.replace(
				/\.[^/.]+$/,
				""
			)}.webp`;
		} else {
			processedBuffer = buffer;
			newFileName = `${Date.now()}_${originalname}`;
			contentType = mimetype;
		}

		const file = bucket.file(newFileName);
		const stream = file.createWriteStream({
			metadata: {
				contentType: contentType,
			},
		});

		stream.on("error", (err) => {
			console.error(err);
			res.status(500).send("Internal Server Error");
		});

		stream.on("finish", () => {
			const publicUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;
			res.status(200).json({ url: publicUrl });
		});

		stream.end(processedBuffer);
	} catch (error) {
		console.error(error);
		res.status(500).send("Internal Server Error");
	}
};

module.exports = {
	uploadMedia,
};
