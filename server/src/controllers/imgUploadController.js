const sharp = require("sharp");
const { Storage } = require("@google-cloud/storage");

const storageClient = new Storage({
	keyFilename: "./funhub-keyfile.json",
});
const bucket = storageClient.bucket("funhub");

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

			const gcsFile = bucket.file(newFileName);
			const stream = gcsFile.createWriteStream({
				metadata: {
					contentType: contentType,
				},
			});

			return new Promise((resolve, reject) => {
				stream.on("error", (err) => {
					console.error(err);
					reject(err);
				});

				stream.on("finish", () => {
					const publicUrl = `https://storage.googleapis.com/${bucket.name}/${gcsFile.name}`;
					resolve(publicUrl);
				});

				stream.end(processedBuffer);
			});
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
