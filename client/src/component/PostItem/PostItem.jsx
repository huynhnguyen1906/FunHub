import "./PostItem.scss";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import PMain from "./PMain/PMain";

const CountFormat = (count) => {
	if (count > 10000) {
		return `${Math.floor(count / 10000)}万${Math.floor(count % 10000)}`;
	} else {
		return `${count}`;
	}
};

function PostItem({ post, onPostClick }) {
	const location = useLocation();
	const navigate = useNavigate();
	const currentPath = location.pathname;

	const handleOpenPostDetail = () => {
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
	return (
		<div className="PostItem">
			<div className="pItemTop">
				<div className="userInfoW">
					<div className="userInfo">
						<div className="userInfoK">
							<div className="userIcon">
								<img src={post.user.avatar} alt="" />
							</div>
							<div className="userName">{post.user.name}</div>
						</div>
						<div className="postTime">2年前</div>
					</div>
					<div className="btn">
						<span></span>
					</div>
				</div>
				<div className="PTextW">
					<div className="PText">
						{post.content.length > 400 && !isExpanded
							? `${post.content.substring(0, 400)}...`
							: post.content}
						{post.content.length > 400 && (
							<span onClick={toggleExpanded}>
								{isExpanded ? "" : "  すべてを見る"}
							</span>
						)}
					</div>
				</div>
			</div>
			<div className={PMainClass}>
				{post.media.slice(0, 4).map((mediaItem, index) => (
					<PMain
						key={index}
						media={mediaItem}
						post={post}
						Click={() => handleClick(mediaItem.id)}
					/>
				))}
				<div className={seeMoreClass}>{`${post.media.length % 4} 件以上`}</div>
			</div>
			<div className="pItemBottom">
				<div className="reactCount">
					<div className="likeCount">
						<i></i>
						{CountFormat(post.likes)}
					</div>
					<div className="cmtCount" onClick={handleOpenPostDetail}>
						コメント{CountFormat(post.comments)}件
					</div>
				</div>
				<div className="bar"></div>
				<div className="btnBox">
					<div className="btnW">
						<div className="btn active">
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
