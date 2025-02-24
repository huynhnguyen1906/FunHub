import "./PostItem.scss";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment-timezone";
import PMain from "./PMain/PMain";
import axios from "axios";

const timeFormat = (time) => {
	const notiTime = moment.utc(time).toDate();
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

const CountFormat = (count) => {
	if (count > 10000) {
		return `${Math.floor(count / 10000)}万${Math.floor(count % 10000)}`;
	} else {
		return `${count}`;
	}
};

function PostItem({ post, onPostClick, userData }) {
	const location = useLocation();
	const navigate = useNavigate();
	const currentPath = location.pathname;

	const handleOpenPostDetail = () => {
		if (!userData) {
			alert("ログインしてください。");
			return;
		}
		if (post && post.id && post.media && post.media[0] && post.media[0].id) {
			navigate(`${currentPath}/post/${post.id}/${post.media[0].id}`);
		}
	};
	const [isExpanded, setIsExpanded] = useState(false);

	const toggleExpanded = () => {
		setIsExpanded(!isExpanded);
	};
	let PMainClass = "PMainW";
	if (post.media.length === 0) {
		PMainClass += " noMedia";
	} else if (post.media.length === 2) {
		PMainClass += " PMainWTwo";
	} else if (post.media.length === 3) {
		PMainClass += " PMainWThree";
	} else if (post.media.length >= 4) {
		PMainClass += " PMainWFour";
	}

	let seeMoreClass = "seeMore none";
	if (post.media.length > 4) {
		seeMoreClass = " seeMore";
	}
	const handleClick = (mediaId) => {
		onPostClick(post, mediaId);
	};
	const [likeCount, setLikeCount] = useState(post.like_count);

	const [like, setLike] = useState(false);
	const handleLike = () => {
		if (userData && userData.user && userData.user.userID && post && post.id) {
			const action = like ? "dislike" : "like";
			axios
				.post("/api/post/like", {
					userID: userData.user.userID,
					postID: post.id,
					action: action,
				})
				.then((response) => {
					setLike(!like);
					setLikeCount(like ? likeCount - 1 : likeCount + 1);
				})
				.catch((error) => {
					console.error("An error occurred while liking/unliking the post", error);
				});
		} else {
			alert("ログインしてください。");
		}
	};

	useEffect(() => {
		if (userData && userData.user && userData.user.userID && post && post.id) {
			axios
				.get("/api/post/hasLiked", {
					params: {
						userID: userData.user.userID,
						postID: post.id,
					},
				})
				.then((response) => {
					if (response.data && response.data.hasLiked) {
						setLike(response.data.hasLiked);
					}
				})
				.catch((error) => {
					console.error("An error occurred while checking the like status", error);
				});
		}
	}, [userData, post]);
	return (
		<div className="PostItem">
			<div className="pItemTop">
				<div className="userInfoW">
					<div className="userInfo">
						<div className="userInfoK">
							<div className="userIcon">
								<img src={post.user_avatar} alt="" />
							</div>
							<div className="userName">{post.user_name}</div>
						</div>
						<div className="postTime">{timeFormat(post.create_at)}</div>
					</div>
					<div className="btn">
						<span></span>
					</div>
				</div>
				<div className="PTextW">
					<div className="PText">
						{post.content.length > 400 && !isExpanded ? `${post.content.substring(0, 400)}...` : post.content}
						{post.content.length > 400 && <span onClick={toggleExpanded}>{isExpanded ? "" : "  すべてを見る"}</span>}
					</div>
				</div>
			</div>
			<div className={PMainClass}>
				{post.media.slice(0, 4).map((mediaItem, index) => (
					<PMain key={index} media={mediaItem} post={post} Click={() => handleClick(mediaItem.id)} />
				))}
				<div className={seeMoreClass}>{`${post.media.length % 4} 件以上`}</div>
			</div>
			<div className="pItemBottom">
				<div className="reactCount">
					<div className="likeCount">
						<i></i>
						{CountFormat(likeCount)}
					</div>
					<div className="cmtCount" onClick={handleOpenPostDetail}>
						コメント{CountFormat(post.comment_count)}件
					</div>
				</div>
				<div className="bar"></div>
				<div className="btnBox">
					<div className="btnW">
						<div className={`btn ${like ? "active" : ""}`} onClick={handleLike}>
							<i></i>
							いいね！
						</div>
					</div>
					<div className="btnW" onClick={handleOpenPostDetail}>
						<div className="btn">
							<i></i>
							コメントする
						</div>
					</div>
					<div className="btnW">
						<div className="btn">
							<i></i>
							シェア
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default PostItem;
