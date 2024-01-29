import "./Home.scss";
import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import CratePostBar from "~/component/CreatePost/CreatePostBar/CreatePostBar";
import PostItem from "~/component/PostItem/PostItem";
import PostDetail from "~/component/PostDetail/PostDetail";

function Home() {
	const navigate = useNavigate();
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		fetch("/posts")
			.then((response) => response.json())
			.then((data) => setPosts(data))
			.catch((error) => console.error("Error:", error));
	}, []);

	const openPostDetail = (post, mediaId) => {
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
			<div className="crateBox">
				<CratePostBar />
			</div>
			<Routes>
				<Route
					path="post/:postId/:mediaId"
					element={<PostDetail onClose={closePostDetail} />}
				/>
			</Routes>
			<div className="postContent">
				{posts.map((post, id) => (
					<PostItem key={id} post={post} onPostClick={openPostDetail} />
				))}
			</div>
		</div>
	);
}

export default Home;
