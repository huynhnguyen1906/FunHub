import "./PostDetail.scss";
import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import CommentW from "./CommentW/CommentW";
import CmtInput from "./CmtInput/CmtInput";
import axios from "axios";
import moment from "moment-timezone";

const CountFormat = (count) => {
	if (count > 10000) {
		return `${Math.floor(count / 10000)}万${Math.floor(count % 10000)}`;
	} else {
		return `${count}`;
	}
};

const timeFormat = (time) => {
	const notiTime = moment.utc(time).add(9, "hours").toDate();
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

function PostDetail({ onClose }) {
	const navigate = useNavigate();
	const { postId, mediaId } = useParams();
	const [post, setPost] = useState(null);
	const [media, setMedia] = useState(null);
	const [comments, setComments] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const handleNextClick = () => {
		const newIndex = (currentIndex + 1) % post.media.length;
		setCurrentIndex(newIndex);
		navigate(`/home/post/${postId}/${post.media[newIndex].id}`);
	};
	const handlePrevClick = () => {
		const newIndex = (currentIndex - 1 + post.media.length) % post.media.length;
		setCurrentIndex(newIndex);
		navigate(`/home/post/${postId}/${post.media[newIndex].id}`);
	};

	const [tIsExpanded, tSetIsExpanded] = useState(false);
	const toggleExpanded = () => {
		tSetIsExpanded(!tIsExpanded);
	};

	const [showAllComments, setShowAllComments] = useState(false);
	const handleSeeMoreClick = () => {
		setShowAllComments(true);
	};

	useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.key === "Escape") {
				onClose();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		const videos = document.getElementsByTagName("video");
		setTimeout(() => {
			for (let i = 0; i < videos.length; i++) {
				videos[i].pause();
			}
		}, 500);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [onClose]);

	useEffect(() => {
		const homeContent = document.querySelector(".homeContent");
		const commentW = document.querySelector(".CommentW");

		const preventScroll = (e) => {
			if (commentW && !commentW.contains(e.target)) {
				e.preventDefault();
			}
		};

		homeContent.addEventListener("wheel", preventScroll, { passive: false });

		const style = document.createElement("style");
		style.innerHTML = `
        ::-webkit-scrollbar {
            display: none;
        }
        html {
            scrollbar-width: none; /* Firefox */
            -ms-overflow-style: none; /* IE and Edge */
        }
    `;
		document.head.appendChild(style);

		return () => {
			homeContent.removeEventListener("wheel", preventScroll);
			document.head.removeChild(style);
		};
	}, []);

	useEffect(() => {
		axios
			.get(`/posts/${postId}`)
			.then((response) => {
				const post = response.data;
				setPost(post);
				const media = post.media.find((media) => media.id === Number(mediaId));
				setMedia(media);
				const mediaIndex = post.media.findIndex(
					(media) => media.id === Number(mediaId)
				);
				setCurrentIndex(mediaIndex);
			})
			.catch((error) => console.error("Lỗi:", error));
	}, [postId, mediaId]);

	useEffect(() => {
		axios
			.get(`/comments/${postId}`)
			.then((response) => {
				const comments = response.data;
				setComments(comments);
			})
			.catch((error) => console.error("Error fetching comments:", error));
	}, [postId]);
	if (!post) {
		return <div className="PostDetailDP"></div>;
	}

	return (
		<div className="PostDetailDP">
			<div className="PostDetail">
				<div className="pDetailTop">
					<div className="userIcon">
						<img src={post.user_avatar} alt="" />
					</div>
					<div className="settingBtn"></div>
				</div>
				<div className="pDetailM">
					<div className="PostTContent">
						<div className="pInfoW">
							<div className="pInfo">
								<div className="pUInfo">
									<div className="pUserIcon">
										<img src={post.user_avatar} alt="" />
									</div>
									<div className="pUserName">{post.user_name}</div>
								</div>
								<div className="pTime">{timeFormat(post.create_at)}</div>
							</div>
							<div className="plusBtn">
								<span></span>
							</div>
						</div>
						<div className="PText">
							{post.content.length > 350 && !tIsExpanded
								? `${post.content.substring(0, 350)}...`
								: post.content}
							{post.content.length > 350 && (
								<span onClick={toggleExpanded}>
									{tIsExpanded ? "" : "  すべてを見る"}
								</span>
							)}
						</div>
						<div className="pReactBarW">
							<div className="reactCount">
								<div className="likeCount">
									<i></i>
									{CountFormat(post.like_count)}
								</div>
								<div className="cmtCount">
									コメント{CountFormat(post.comment_count)}件
								</div>
							</div>
							<div className="btnBox">
								<div className="btnW">
									<div className="btn active">
										<i></i>
										いいね！
									</div>
								</div>
								<div className="bar"></div>
								<div className="btnW">
									<div className="btn">
										<i></i>
										シェア
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="cmtBox">
					{showAllComments
						? comments.map((comment, index) => (
								<CommentW key={index} comment={comment} />
						  ))
						: comments
								.slice(0, 6)
								.map((comment, index) => (
									<CommentW key={index} comment={comment} />
								))}
					{comments.length > 6 && !showAllComments && (
						<div className="seeMore" onClick={handleSeeMoreClick}>
							すべてを見る
						</div>
					)}
				</div>
				<CmtInput postId={postId} />
			</div>
			<div
				className="mediaDP"
				onClick={(e) => {
					if (e.target.classList.contains("mediaDP")) {
						onClose();
					}
				}}
			>
				<div
					className={`preBtn ${post.media.length === 1 ? "none" : ""}`}
					onClick={handlePrevClick}
				>
					<span></span>
				</div>
				<div className="media">
					{media && media.type === "video" ? (
						<video src={media.url} controls autoPlay={false} />
					) : (
						<img src={media ? media.url : ""} alt="" />
					)}
				</div>
				<div
					className={`nextBtn ${post.media.length === 1 ? "none" : ""}`}
					onClick={handleNextClick}
				>
					<span></span>
				</div>
				<div className="btnBox">
					<a className="logo" href="/home" aria-label="Home"></a>
					<div className="closeBtn" onClick={onClose}></div>
				</div>
			</div>
		</div>
	);
}

export default PostDetail;
