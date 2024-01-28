import "./style.scss";
import CratePostBar from "~/component/CreatePost/CreatePostBar/CreatePostBar";
function Trending() {
	return (
		<div className="trendingContent">
			<div className="crateBox">
				<CratePostBar />
			</div>
			<div className="postContent"></div>
		</div>
	);
}

export default Trending;
