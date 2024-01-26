import "./CreatePostBar.scss";
import CrPostDpNavHT from "../CreatePDpHT/CreatePostDpHT";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function CratePostBar() {
	const location = useLocation();
	const navigate = useNavigate();
	const isHActive = location.pathname === "/home";
	const isTActive = location.pathname === "/trending";
	const [showCreatePost, setShowCreatePost] = useState(false);
	const handleShowCreatePost = () => {
		setShowCreatePost(true);
	};
	const handleCloseCreatePost = () => {
		setShowCreatePost(false);
	};
	const handleGoHome = () => {
		navigate("/home");
		window.location.reload();
	};
	const handleGoTrending = () => {
		navigate("/trending");
		window.location.reload();
	};
	return (
		<div className="createBar">
			{showCreatePost && <CrPostDpNavHT onClose={handleCloseCreatePost} />}
			<div className="crNavbar">
				<div className={`crNavbarH ${isHActive ? "active" : ""}`}>
					<div onClick={handleGoHome}>
						<i></i>
						<p>ホーム</p>
					</div>
				</div>
				<div className="Bar"></div>
				<div className={`crNavbarT ${isTActive ? "active" : ""}`}>
					<div onClick={handleGoTrending}>
						<i></i>
						<p>トレンド</p>
					</div>
				</div>
			</div>
			<div className="crInputBox">
				<div className="inputBoxW">
					<div className="inputBox">
						<div className="userIcon">
							<img
								src="https://i.pinimg.com/736x/b9/c4/7e/b9c47ef70bff06613d397abfce02c6e7.jpg"
								alt=""
							/>
						</div>
						<div className="input" onClick={handleShowCreatePost}></div>
					</div>
				</div>
				<div className="bar"></div>
				<div className="mediaBox">
					<div className="media" onClick={handleShowCreatePost}>
						<i></i>
						<p>写真・動画</p>
					</div>
					<div className="emoji" onClick={handleShowCreatePost}>
						<i></i>
						<p>気分・アクティビティ</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CratePostBar;
