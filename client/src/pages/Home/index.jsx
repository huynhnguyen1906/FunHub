import "./Home.scss";
import CratePostBar from "~/component/CreatePost/CreatePostBar/CreatePostBar";

function Home() {
	return (
		<div className="homeContent">
			<div className="crateBox">
				<CratePostBar />
			</div>
			<div className="postContent"></div>
		</div>
	);
}

export default Home;
