import "./Home.scss";
import CratePostBar from "~/component/CreatePost/CreatePostBar/CreatePostBar";
import PostItem from "~/component/PostItem/PostItem";

function Home() {
	return (
		<div className="homeContent">
			<div className="crateBox">
				<CratePostBar />
			</div>
			<div className="postContent">
				<PostItem />
			</div>
		</div>
	);
}

export default Home;
