import React, { useState } from "react";
import axios from "axios";

function Test() {
	const [files, setFiles] = useState([]);
	const [uploadedUrls, setUploadedUrls] = useState([]);

	const handleFileChange = (event) => {
		const selectedFiles = Array.from(event.target.files);
		const maxFileSizeInMB = 150; // Maximum file size in MB

		const validFiles = selectedFiles.filter(
			(file) => file.size / (1024 * 1024) <= maxFileSizeInMB
		);

		if (validFiles.length !== selectedFiles.length) {
			alert("150MB 以下のファイルを選択してください。");
		}

		setFiles(validFiles);
	};

	const handleUpload = async () => {
		try {
			if (!files.length) {
				throw new Error("No files selected");
			}

			const formData = new FormData();
			files.forEach((file) => {
				formData.append("media", file);
			});

			const response = await axios.post("/upload", formData, {
				headers: { "Content-Type": "multipart/form-data" },
			});

			setUploadedUrls(response.data.urls);
			console.log(response.data);
		} catch (error) {
			console.error("Error uploading files:", error);
		}
	};

	const isImage = (url) => {
		return url.match(/\.(jpeg|jpg|gif|png|webp)$/) != null;
	};

	const isVideo = (url) => {
		return url.match(/\.(mp4|webm)$/) != null;
	};
	return (
		<div>
			<input type="file" multiple onChange={handleFileChange} />
			<button onClick={handleUpload}>Upload</button>

			{uploadedUrls.map((url, index) => (
				<div key={index}>
					<p>Uploaded URL:</p>
					{isImage(url) && (
						<img src={url} alt="Uploaded" style={{ maxWidth: "100%" }} />
					)}
					{isVideo(url) && (
						<video src={url} controls style={{ maxWidth: "100%" }} />
					)}
				</div>
			))}
		</div>
	);
}

export default Test;
