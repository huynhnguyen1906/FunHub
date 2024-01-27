import "../CreatePostDp.scss";
import { useState, useRef, useCallback } from "react";
import MediaInput from "../MediaInput/MediaInput";

const user = {
	name: "QTaro",
	icon: "https://imgflip.com/s/meme/Scared-Cat.jpg",
};

function CrPostDpNav({ onClose }) {
	const [contentEdiTableText, setContentEdiTableText] =
		useState("なんか面白いことある？");

	const handleFocus = () => {
		setContentEdiTableText("");
	};
	const inputRef = useRef();

	const [inputText, setInputText] = useState("");

	const handleInput = useCallback((e) => {
		setInputText(e.target.textContent);
	}, []);
	const fileInputRef = useRef();
	const [files, setFiles] = useState([]);

	const handleIconClick = useCallback(() => {
		fileInputRef.current.click();
	}, []);

	const handleFileChange = useCallback((e) => {
		setFiles((prevFiles) => [...prevFiles, ...Array.from(e.target.files)]);
	}, []);

	const handleDelete = useCallback(
		(deleteIndex) => {
			setFiles(files.filter((file, index) => index !== deleteIndex));
		},
		[files]
	);
	const handleSend = useCallback(() => {
		if (inputText === "" && files.length === 0) {
			alert("投稿内容を入力してください");
		} else {
			console.log(inputText, files);
			setFiles([]);
			setInputText("");
			setContentEdiTableText("なんか面白いことある？");
			inputRef.current.textContent = "";
		}
	}, [inputText, files]);

	return (
		<div
			className="CrPostDp"
			onClick={(e) => {
				if (e.target === e.currentTarget) {
					onClose();
				}
			}}
		>
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
							<img src={user.icon} alt="" />
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
									{files.map((file, index) => (
										<MediaInput
											key={index}
											file={file}
											onDelete={() => handleDelete(index)}
										/>
									))}
								</div>
							</div>
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
		</div>
	);
}

export default CrPostDpNav;
