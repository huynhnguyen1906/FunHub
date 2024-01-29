import "./CmtInput.scss";
import { useState, useRef, useCallback } from "react";
function CmtInput() {
	const [contentEdiTableText, setContentEdiTableText] =
		useState("コメントを入力。。。");

	const handleFocus = () => {
		setContentEdiTableText("");
	};
	const inputRef = useRef();

	const [inputText, setInputText] = useState("");

	const handleInput = useCallback((e) => {
		setInputText(e.target.textContent);
	}, []);
	const fileInputRef = useRef();
	const handleIconClick = useCallback(() => {
		fileInputRef.current.click();
	}, []);

	const [files, setFiles] = useState([]);
	const handleFileChange = (event) => {
		setFiles(event.target.files[0]);
	};

	let isVideo = false;
	let fileURL = "";

	if (files instanceof File && files.type) {
		isVideo = files.type.startsWith("video");
		fileURL = URL.createObjectURL(files);
	}

	const handleDelete = useCallback((deleteIndex) => {
		setFiles(null);
	}, []);
	const handleSend = useCallback(() => {
		if (inputText === "" && files.length === 0) {
			alert("投稿内容を入力してください");
		} else {
			console.log(inputText, files);
			setFiles([]);
			setInputText("");
			setContentEdiTableText("コメントを入力。。。");
			inputRef.current.textContent = "";
		}
	}, [inputText, files]);

	return (
		<div className="CmtInput">
			{files && fileURL && (
				<div className="mediaInputBox">
					<div className="closeBtn" onClick={handleDelete}>
						<span></span>
					</div>
					{isVideo ? (
						<div className="playBtnB">
							<video src={fileURL} />{" "}
							<div className="playBtn">
								<span></span>
							</div>
						</div>
					) : (
						<img src={fileURL} alt="" />
					)}
				</div>
			)}
			<div className="inputContent">
				<div className="avatar">
					<img src="https://imgflip.com/s/meme/Scared-Cat.jpg" alt="" />
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
					<div className="mediaToolsB">
						<div className="mediaTools">
							<div className="tools" onClick={handleIconClick}>
								<i></i>
								<input
									type="file"
									ref={fileInputRef}
									style={{ display: "none" }}
									accept="image/*,video/*"
									onChange={handleFileChange}
								/>
							</div>
							<div className="tools">
								<i></i>
							</div>
							<div className="tools">
								<i></i>
							</div>
						</div>
						<div className="sendBtn" onClick={handleSend}></div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CmtInput;
