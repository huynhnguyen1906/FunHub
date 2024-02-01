import { useState } from "react";

function CommentW({ comment }) {
	const [CIsExpanded, CSetIsExpanded] = useState(false);
	const toggleExpanded = () => {
		CSetIsExpanded(!CIsExpanded);
	};
	return (
		<div className="CommentW">
			<div className="userIcon">
				<img src={comment.user.avatar} alt="" />
			</div>
			<div className="cmtContent">
				<div className="cmtInfo">
					<div className="userName">{comment.user.name}</div>
					<div className="cmtTime">2年前</div>
				</div>
				<div className="cmtText">
					{comment.content.length > 175 && !CIsExpanded
						? `${comment.content.substring(0, 175)}...`
						: comment.content}
					{comment.content.length > 175 && (
						<span onClick={toggleExpanded}>
							{CIsExpanded ? "" : "  すべてを見る"}
						</span>
					)}
				</div>
				<div className={`cmtMedia ${comment.media.length === 0 ? "none" : ""}`}>
					{comment.media ? (
						comment.media.type === "image" ? (
							<img src={comment.media.url} alt="Comment" />
						) : (
							<video src={comment.media.url} controls />
						)
					) : null}
				</div>
			</div>
		</div>
	);
}

export default CommentW;
