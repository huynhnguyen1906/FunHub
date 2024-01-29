import { useState } from "react";

const postTimeFormat = (time) => {
	const notiTime = new Date(time);
	const now = new Date();
	const nowUTC = new Date(now.toUTCString());
	const diff = nowUTC - notiTime;
	const diffMin = Math.floor(diff / 60000);
	const diffHour = Math.floor(diffMin / 60);
	const diffDay = Math.floor(diffHour / 24);
	const diffMonth = Math.floor(diffDay / 30);
	const diffYear = Math.floor(diffMonth / 12);
	if (diffYear > 0) {
		return `${diffYear}年前`;
	} else if (diffMonth > 0) {
		return `${diffMonth}ヶ月前`;
	} else if (diffDay > 0) {
		return `${diffDay}日前`;
	} else if (diffHour > 0) {
		return `${diffHour}時間前`;
	} else if (diffMin > 0) {
		return `${diffMin}分前`;
	} else {
		return `たった今`;
	}
};
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
					<div className="cmtTime">{postTimeFormat(comment.timestamp)}</div>
				</div>
				<div className="cmtText">
					{comment.content.length > 350 && !CIsExpanded
						? `${comment.content.substring(0, 350)}...`
						: comment.content}
					{comment.content.length > 350 && (
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
