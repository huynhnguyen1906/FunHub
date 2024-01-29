import "./PostDetail.scss";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
function PostDetail({ onClose }) {
	const { postId, mediaId } = useParams();
	const [post, setPost] = useState(null);
	const [media, setMedia] = useState(null);

	const [tIsExpanded, tSetIsExpanded] = useState(false);
	useEffect(() => {
		const homeContent = document.querySelector(".homeContent");

		const preventScroll = (e) => {
			e.preventDefault();
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
		fetch(`/posts/${postId}`)
			.then((response) => response.json())
			.then((post) => {
				setPost(post);
				const media = post.media.find((media) => media.id === mediaId);
				setMedia(media);
			})
			.catch((error) => console.error("Lỗi:", error));
	}, [postId, mediaId]);

	if (!post) {
		return <div className="PostDetailDP"></div>;
	}

	const toggleExpanded = () => {
		tSetIsExpanded(!tIsExpanded);
	};

	return (
		<div className="PostDetailDP">
			<div className="PostDetail">
				<div className="pDetailTop">
					<div className="userIcon"></div>
					<div className="settingBtn"></div>
				</div>
				<div className="PText">
					{post.content.length > 400 && !tIsExpanded
						? `${post.content.substring(0, 400)}...`
						: post.content}
					{post.content.length > 400 && (
						<span onClick={toggleExpanded}>
							{tIsExpanded ? "" : "  すべてを見る"}
						</span>
					)}
				</div>
			</div>
			<div className="mediaDP">
				<div className="media">
					{" "}
					{media && media.type === "video" ? (
						<video src={media.url} controls />
					) : (
						<img src={media.url} alt="" />
					)}{" "}
				</div>
			</div>
		</div>
	);
}

export default PostDetail;
