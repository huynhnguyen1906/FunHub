import "./Home.scss";
import React, {
	useState,
	useEffect,
	useCallback,
	useRef,
	useContext,
} from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import CratePostBar from "~/component/CreatePost/CreatePostBar/CreatePostBar";
import PostItem from "~/component/PostItem/PostItem";
import PostDetail from "~/component/PostDetail/PostDetail";
import AuthContext from "~/component/checkLogin/AuthContext";
import axios from "axios";
function Home() {
	const navigate = useNavigate();
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [allPostsLoaded, setAllPostsLoaded] = useState(false);
	const { userData } = useContext(AuthContext);

	const loadingRef = useRef(loading);
	const pageRef = useRef(page);

	loadingRef.current = loading;
	pageRef.current = page;
	const loadPosts = useCallback(async () => {
		if (loadingRef.current || allPostsLoaded) {
			return;
		}
		setLoading(true);
		const response = await axios.get(`/posts?page=${pageRef.current}&limit=10`);
		if (response.data.length < 10) {
			setAllPostsLoaded(true);
		}
		setPosts((prevPosts) => {
			// Filter out any posts that already exist in the list
			const newPosts = response.data.filter(
				(newPost) => !prevPosts.find((post) => post.id === newPost.id)
			);
			return [...prevPosts, ...newPosts];
		});
		setPage((prevPage) => prevPage + 1);
		setLoading(false);
	}, [allPostsLoaded]);

	const handleScroll = useCallback(
		(event) => {
			if (
				!allPostsLoaded &&
				window.innerHeight + window.scrollY >= document.body.offsetHeight
			) {
				loadPosts();
			}
		},
		[loadPosts, allPostsLoaded]
	);

	useEffect(() => {
		loadPosts();
	}, [loadPosts]);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [handleScroll]);
	const openPostDetail = (post, mediaId) => {
		if (!userData) {
			alert("ログインしてください。");
			return;
		}
		if (post && mediaId) {
			navigate(`/home/post/${post.id}/${mediaId}`);
		} else {
			console.error("Post or mediaId is undefined");
		}
	};

	const closePostDetail = () => {
		navigate("/home");
	};
	return (
		<div className="homeContent noScroll">
			{posts ? (
				<>
					<Routes>
						<Route
							path="post/:postId/:mediaId"
							element={<PostDetail onClose={closePostDetail} />}
						/>
					</Routes>
					<div className="crateBox">
						<CratePostBar />
					</div>
					<div className="postContent">
						{posts.map((post, id) => (
							<PostItem
								key={id}
								post={post}
								onPostClick={openPostDetail}
								userData={userData}
							/>
						))}
					</div>
				</>
			) : (
				<div className="loading">Loading...</div>
			)}
		</div>
	);
}

export default Home;
