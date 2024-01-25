import "./CreatePostDp.scss";
import { useState } from "react";
function CrPostDp({ onClose }) {
	const [contentEdiTableText, setContentEdiTableText] =
		useState("なんか面白いことある？");
	const handleFocus = () => {
		setContentEdiTableText("");
	};
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
				</div>
				<div className="inputContentWrap">
					<div className="inputContent">
						<div className="avatar">
							<img
								src="https://i1.sndcdn.com/avatars-000299868797-urkzpd-t500x500.jpg"
								alt="meow"
							/>
						</div>
						<div className="input" contenteditable="true" onFocus={handleFocus}>
							{contentEdiTableText}
						</div>
					</div>
				</div>
				<div className="inputToolsWrap">
					<div className="inputTool">
						<div className="toolsBox">
							<div className="tool">
								<i className="media"></i>
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
							<button>投稿</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CrPostDp;
