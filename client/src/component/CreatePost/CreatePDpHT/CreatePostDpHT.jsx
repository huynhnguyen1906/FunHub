import "../CreatePostDp.scss";
import { useState, useRef, useCallback, useEffect } from "react";
import MediaInput from "../MediaInput/MediaInput";
import axios from "axios";

function CrPostDpNavHT({ onClose }) {
	const [userData, setUserData] = useState(null);
	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await axios.get("/api/user/myProfile");
				setUserData(response.data);
			} catch (error) {
				console.error("Error fetching user profile:", error);
			}
		};

		fetchUserData();
	}, []);
	const [contentEdiTableText, setContentEdiTableText] = useState("なんか面白いことある？");

	const handleFocus = () => {
		setContentEdiTableText("");
	};
	const inputRef = useRef();
	const [inputText, setInputText] = useState("");

	const handleInput = useCallback((e) => {
		setInputText(e.target.innerText);
	}, []);

	const fileInputRef = useRef();
	const [selectedFiles, setSelectedFiles] = useState([]);

	const handleIconClick = useCallback(() => {
		fileInputRef.current.click();
	}, []);
	const [alert, setAlert] = useState("");

	const handleFileChange = useCallback(
		(e) => {
			const selectedFiles = Array.from(e.target.files);
			const maxFileSizeInMB = 150;

			const validFiles = selectedFiles.filter((file) => file.size / (1024 * 1024) <= maxFileSizeInMB);

			if (validFiles.length !== selectedFiles.length) {
				alert("150MB 以下のファイルを選択してください。");
			}

			const media = validFiles.map((file) => {
				let type;
				if (file.type.startsWith("image/")) {
					type = "image";
				} else if (file.type.startsWith("video/")) {
					type = "video";
				} else {
					type = "unknown";
				}

				return { type, file };
			});

			setSelectedFiles((prevFiles) => [...prevFiles, ...media]);
			console.log("Selected files:", selectedFiles);
		},
		[alert]
	);

	const handleDelete = useCallback((deleteIndex) => {
		setSelectedFiles((currentMedia) => currentMedia.filter((_, index) => index !== deleteIndex));
	}, []);
	const handleSend = useCallback(async () => {
		if (inputText === "" && selectedFiles.length === 0) {
			window.alert("投稿内容を入力してください");
		} else if (selectedFiles.length === 0) {
			window.alert("画像または動画最低１枚を選択してください");
		} else {
			try {
				const formData = new FormData();
				selectedFiles.forEach(({ file }) => {
					formData.append("media", file);
				});
				setAlert("投稿中...");
				const uploadResponse = await axios.post("/upload", formData, {
					headers: { "Content-Type": "multipart/form-data" },
				});

				const media = uploadResponse.data.urls.map((url, index) => ({
					url,
					type: selectedFiles[index].type,
				}));

				await axios.post("/api/createPost", {
					content: inputText,
					media,
				});
				onClose();
			} catch (error) {
				console.error("Error creating post:", error);
			}
		}
	}, [inputText, selectedFiles, onClose, setAlert]);

	return (
		<div
			className="CrPostDp"
			onClick={(e) => {
				if (e.target === e.currentTarget) {
					onClose();
				}
			}}
		>
			{userData && (
				<div className="CrInputBox">
					<div className="boxTitle">
						<h2>投稿を作成</h2>
						<div className="closeBtn" onClick={onClose}>
							<span></span>
						</div>
					</div>
					<div className="inputContentWrap">
						<div className="inputContent">
							<div className="avatar">
								<img src={userData.user.avatar} alt="" />
							</div>
							<div className="inputWrap">
								<div
									className="input"
									ref={inputRef}
									contentEditable="true"
									onFocus={handleFocus}
									onInput={handleInput}
									onDragOver={(e) => {
										e.preventDefault();
									}}
									onDrop={(e) => {
										e.preventDefault();
									}}
								></div>
								<div className="inlineText">{contentEdiTableText}</div>
								<div className="mediaInputBox">
									<div className="mediaInput">
										{selectedFiles.map((fileData, index) => (
											<MediaInput key={index} file={fileData.file} onDelete={() => handleDelete(index)} />
										))}
									</div>
								</div>
								<span className="alert">{alert}</span>
							</div>
						</div>
					</div>
					<div className="inputToolsWrap">
						<div className="inputTool">
							<div className="toolsBox">
								<div className="tool">
									<i className="media" onClick={handleIconClick}></i>
									<input
										type="file"
										ref={fileInputRef}
										style={{ display: "none" }}
										multiple
										accept="image/*,video/*"
										onChange={handleFileChange}
									/>
								</div>
								<div className="tool">
									<i className="emoji"></i>
								</div>
								<div className="tool">
									<i className="gif"></i>
								</div>
								<div className="tool">
									<i className="map"></i>
								</div>
							</div>
							<div className="confirmBtn">
								<button onClick={handleSend}>投稿</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default CrPostDpNavHT;
