import { useState } from "react";

function CommentW({ comment }) {
	const [CIsExpanded, CSetIsExpanded] = useState(false);
	const toggleExpanded = () => {
		CSetIsExpanded(!CIsExpanded);
	};
	return (
		comment && (
			<div className="CommentW">
				<div className="userIcon">
					<img src={comment.user.avatar} alt="" />
				</div>
				<div className="cmtContent">
					<div className="cmtInfo">
						<div className="userName">{comment.user.fullName}</div>
						<div className="cmtTime">2年前</div>
					</div>
					<div className={`cmtText ${comment.content === "" ? "none" : ""}`}>
						{comment.content && comment.content.length > 175 && !CIsExpanded
							? `${comment.content.substring(0, 175)}...`
							: comment.content}
						{comment.content && comment.content.length > 175 && (
							<span onClick={toggleExpanded}>
								{CIsExpanded ? "" : "  すべてを見る"}
							</span>
						)}
					</div>
					<div className={`cmtMedia ${comment.mediaURL === "" ? "none" : ""}`}>
						{comment.mediaType &&
							(comment.mediaType === "image" ? (
								<img src={comment.mediaURL} alt="Comment" />
							) : (
								<video src={comment.mediaURL} controls />
							))}
					</div>
				</div>
			</div>
		)
	);
}

export default CommentW;
