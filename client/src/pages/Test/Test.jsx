import React, { useState } from "react";
import axios from "axios";

function Test() {
	const [file, setFile] = useState(null);
	const [uploadedUrl, setUploadedUrl] = useState("");

	const handleFileChange = (event) => {
		const selectedFile = event.target.files[0];
		const fileSizeInMB = selectedFile.size / (1024 * 1024);
		const maxFileSizeInMB = 150; // Maximum file size in MB

		if (fileSizeInMB > maxFileSizeInMB) {
			alert("150MB 以下のファイルを選択してください。");
		} else {
			setFile(selectedFile);
		}
	};

	const handleUpload = async () => {
		try {
			if (!file || !(file instanceof File)) {
				throw new Error("Invalid file");
			}

			const formData = new FormData();
			formData.append("media", file);

			const response = await axios.post("/upload", formData, {
				headers: { "Content-Type": "multipart/form-data" },
			});

			setUploadedUrl(response.data.url);
		} catch (error) {
			console.error("Error uploading file:", error);
		}
	};

	const isImage = (url) => {
		return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
	};

	const isVideo = (url) => {
		return url.match(/\.(mp4|webm)$/) != null;
	};

	return (
		<div>
			<input type="file" onChange={handleFileChange} />
			<button onClick={handleUpload}>Upload</button>

			{uploadedUrl && isImage(uploadedUrl) && (
				<div>
					<p>Uploaded URL:</p>
					<img src={uploadedUrl} alt="Uploaded" style={{ maxWidth: "100%" }} />
				</div>
			)}

			{uploadedUrl && isVideo(uploadedUrl) && (
				<div>
					<p>Uploaded URL:</p>
					<video src={uploadedUrl} controls style={{ maxWidth: "100%" }} />
				</div>
			)}
		</div>
	);
}

export default Test;
