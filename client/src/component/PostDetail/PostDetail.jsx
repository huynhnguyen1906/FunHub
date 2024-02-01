import "./PostDetail.scss";
import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import CommentW from "./CommentW/CommentW";
import CmtInput from "./CmtInput/CmtInput";

const comments = [
	{
		id: 1,
		user: {
			id: 1,
			name: "Huynh",
			avatar:
				"https://uploads.dailydot.com/2018/10/olli-the-polite-cat.jpg?q=65&auto=format&w=2270&ar=2:1&fit=crop",
		},
		content:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
		timestamp: "2021-08-01T12:00:00.000Z",
		media: [],
	},
	{
		id: 2,
		user: {
			id: 1,
			name: "BAKWQ",
			avatar:
				"https://uploads.dailydot.com/2018/10/olli-the-polite-cat.jpg?q=65&auto=format&w=2270&ar=2:1&fit=crop",
		},
		content:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
		timestamp: "2021-08-01T12:00:00.000Z",
		media: {
			url: "https://scontent.cdninstagram.com/v/t2/f1/m69/GICWmACHd-HJZEUBANp2OpO6zRgcbmdjAAAF.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6Im9lcF9oZCJ9&_nc_ht=scontent-muc2-1.xx.fbcdn.net&_nc_cat=101&strext=1&vs=c0a2b66fe0c97cb6&_nc_vs=HBksFQIYOnBhc3N0aHJvdWdoX2V2ZXJzdG9yZS9HSUNXbUFDSGQtSEpaRVVCQU5wMk9wTzZ6UmdjYm1kakFBQUYVAALIAQAVAhg6cGFzc3Rocm91Z2hfZXZlcnN0b3JlL0dJQ1dtQUNTTGNzUUhBb0JBTUpKcGlfLVJxVmVidjRHQUFBRhUCAsgBAEsHiBJwcm9ncmVzc2l2ZV9yZWNpcGUBMQ1zdWJzYW1wbGVfZnBzABB2bWFmX2VuYWJsZV9uc3ViACBtZWFzdXJlX29yaWdpbmFsX3Jlc29sdXRpb25fc3NpbQAoY29tcHV0ZV9zc2ltX29ubHlfYXRfb3JpZ2luYWxfcmVzb2x1dGlvbgAddXNlX2xhbmN6b3NfZm9yX3ZxbV91cHNjYWxpbmcAEWRpc2FibGVfcG9zdF9wdnFzABUAJQAcjBdAAAAAAAAAABERAAAAJuzHmY%2FxlpcFFQIoAkMzGAt2dHNfcHJldmlldxwXQJVoT987ZFoYIWRhc2hfZ2VuMmh3YmFzaWNfaHEyX2ZyYWdfMl92aWRlbxIAGBh2aWRlb3MudnRzLmNhbGxiYWNrLnByb2Q4ElZJREVPX1ZJRVdfUkVRVUVTVBsKiBVvZW1fdGFyZ2V0X2VuY29kZV90YWcGb2VwX2hkE29lbV9yZXF1ZXN0X3RpbWVfbXMBMAxvZW1fY2ZnX3J1bGUHdW5tdXRlZBNvZW1fcm9pX3JlYWNoX2NvdW50ATARb2VtX2lzX2V4cGVyaW1lbnQADG9lbV92aWRlb19pZA8yODk1NzA2NzA0NDI2MDcSb2VtX3ZpZGVvX2Fzc2V0X2lkEDM2MDQ5MzI0MTMxNTYwMzgVb2VtX3ZpZGVvX3Jlc291cmNlX2lkEDE0NTgzNDU1NTgwOTQzMjYcb2VtX3NvdXJjZV92aWRlb19lbmNvZGluZ19pZBAxMzI4MzA2NTIxMjEzMDM3DnZ0c19yZXF1ZXN0X2lkACUCHAAlxAEbB4gBcwQ4MDgzAmNkCjIwMjQtMDEtMjcDcmNiATADYXBwBVZpZGVvAmN0GUNPTlRBSU5FRF9QT1NUX0FUVEFDSE1FTlQTb3JpZ2luYWxfZHVyYXRpb25fcwcxMzcxLjg2AnRzFXByb2dyZXNzaXZlX2VuY29kaW5ncwA%3D&ccb=9-4&oh=00_AfD2mNBj59GE_QSfoAUU4ofEtBamV3sT9zmfYIZp5_8zxg&oe=65B89D0D&_nc_sid=1d576d&_nc_rid=769788810189679&_nc_store_type=1",
			type: "video",
		},
	},
	{
		id: 3,
		user: {
			id: 1,
			name: "GQƯGQ",
			avatar:
				"https://uploads.dailydot.com/2018/10/olli-the-polite-cat.jpg?q=65&auto=format&w=2270&ar=2:1&fit=crop",
		},
		content:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
		timestamp: "2021-08-01T12:00:00.000Z",
		media: {
			url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRqiSvVNFYNfwVCbxZCnxfvArZY93TU-DRow&usqp=CAU",
			type: "image",
		},
	},
	{
		id: 4,
		user: {
			id: 1,
			name: "UHQQ723",
			avatar:
				"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRqiSvVNFYNfwVCbxZCnxfvArZY93TU-DRow&usqp=CAU",
		},
		content:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
		timestamp: "2021-08-01T12:00:00.000Z",
		media: {
			url: "https://d18ufwot1963hr.cloudfront.net/wp-content-production/uploads/2023/11/awkwardly_staring_dog-scaled.jpg",
			type: "image",
		},
	},
	{
		id: 5,
		user: {
			id: 1,
			name: "Uye723",
			avatar:
				"https://d18ufwot1963hr.cloudfront.net/wp-content-production/uploads/2023/11/awkwardly_staring_dog-scaled.jpg",
		},
		content:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
		timestamp: "2021-08-01T12:00:00.000Z",
		media: {
			url: "https://static01.nyt.com/images/2021/04/30/multimedia/30xp-meme/29xp-meme-articleLarge-v3.jpg?quality=75&auto=webp&disable=upscale",
			type: "image",
		},
	},
	{
		id: 6,
		user: {
			id: 1,
			name: "Uye723NW",
			avatar:
				"https://d18ufwot1963hr.cloudfront.net/wp-content-production/uploads/2023/11/awkwardly_staring_dog-scaled.jpg",
		},
		content:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
		timestamp: "2021-08-01T12:00:00.000Z",
		media: {
			url: "https://www.rollingstone.com/wp-content/uploads/2020/07/Screen-Shot-2020-07-15-at-11.24.37-AM.jpg",
			type: "image",
		},
	},
	{
		id: 7,
		user: {
			id: 1,
			name: "NSJ",
			avatar:
				"https://static01.nyt.com/images/2021/04/30/multimedia/30xp-meme/29xp-meme-articleLarge-v3.jpg?quality=75&auto=webp&disable=upscale",
		},
		content:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
		timestamp: "2021-08-01T12:00:00.000Z",
		media: {
			url: "https://d18ufwot1963hr.cloudfront.net/wp-content-production/uploads/2023/11/awkwardly_staring_dog-scaled.jpg",
			type: "image",
		},
	},
	{
		id: 8,
		user: {
			id: 1,
			name: "NSJPU",
			avatar:
				"https://uploads.dailydot.com/2018/10/olli-the-polite-cat.jpg?q=65&auto=format&w=2270&ar=2:1&fit=crop",
		},
		content:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
		timestamp: "2021-08-01T12:00:00.000Z",
		media: {
			url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRqiSvVNFYNfwVCbxZCnxfvArZY93TU-DRow&usqp=CAU",
			type: "image",
		},
	},
];

const CountFormat = (count) => {
	if (count > 10000) {
		return `${Math.floor(count / 10000)}万${Math.floor(count % 10000)}`;
	} else {
		return `${count}`;
	}
};

function PostDetail({ onClose }) {
	const navigate = useNavigate();
	const { postId, mediaId } = useParams();
	const [post, setPost] = useState(null);
	const [media, setMedia] = useState(null);

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
		fetch(`/posts/${postId}`)
			.then((response) => response.json())
			.then((post) => {
				setPost(post);
				const media = post.media.find((media) => media.id === mediaId);
				setMedia(media);
				const mediaIndex = post.media.findIndex(
					(media) => media.id === mediaId
				);
				setCurrentIndex(mediaIndex);
			})
			.catch((error) => console.error("Lỗi:", error));
	}, [postId, mediaId]);

	if (!post) {
		return <div className="PostDetailDP"></div>;
	}
	const postDate = new Date(post.timestamp);

	return (
		<div className="PostDetailDP">
			<div className="PostDetail">
				<div className="pDetailTop">
					<div className="userIcon">
						<img src={post.user.avatar} alt="" />
					</div>
					<div className="settingBtn"></div>
				</div>
				<div className="pDetailM">
					<div className="PostTContent">
						<div className="pInfoW">
							<div className="pInfo">
								<div className="pUInfo">
									<div className="pUserIcon">
										<img src={post.user.avatar} alt="" />
									</div>
									<div className="pUserName">{post.user.name}</div>
								</div>
								<div className="pTime">2年前</div>
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
									{CountFormat(post.likes)}
								</div>
								<div className="cmtCount">
									コメント{CountFormat(post.comments)}件
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
								.slice(0, 4)
								.map((comment, index) => (
									<CommentW key={index} comment={comment} />
								))}
					{comments.length > 4 && !showAllComments && (
						<div className="seeMore" onClick={handleSeeMoreClick}>
							すべてを見る
						</div>
					)}
				</div>
				<CmtInput />
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
