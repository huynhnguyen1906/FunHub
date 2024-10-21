import { useState } from "react";
import moment from "moment-timezone";

const timeFormat = (time) => {
	const notiTime = moment.utc(time).toDate();
	console.log(notiTime);
	const now = new Date();
	const nowUTC = new Date(now.toUTCString());
	const diff = nowUTC - notiTime - 9 * 60 * 60 * 1000;
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
		comment && (
			<div className="CommentW">
				<div className="userIcon">
					<img src={comment.user.avatar} alt="" />
				</div>
				<div className="cmtContent">
					<div className="cmtInfo">
						<div className="userName">{comment.user.fullName}</div>
						<div className="cmtTime">{timeFormat(comment.create_at)}</div>
					</div>
					<div className={`cmtText ${comment.content === "" ? "none" : ""}`}>
						{comment.content && comment.content.length > 175 && !CIsExpanded
							? `${comment.content.substring(0, 175)}...`
							: comment.content}
						{comment.content && comment.content.length > 175 && (
							<span onClick={toggleExpanded}>{CIsExpanded ? "" : "  すべてを見る"}</span>
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
