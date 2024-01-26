import "./Home.scss";
import CratePostBar from "~/component/CreatePost/CreatePostBar/CreatePostBar";

function Home() {
	return (
		<div className="homeContent">
			<div className="crateBox">
				<CratePostBar />
			</div>
		</div>
	);
}

export default Home;
