import "./style.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import UpdateUserInfo from "../../component/UpdateUserInfo/UpdateUserInfo";

function formatDateTime(dateTimeString) {
	const date = new Date(dateTimeString);

	const month = (date.getMonth() + 1).toString().padStart(2, "0");
	const year = date.getFullYear();

	return { year, month };
}
function Profile() {
	const [isUpdateUserInfo, setIsUpdateUserInfo] = useState(false);
	const [userData, setUserData] = useState(null);
	const handleShowUpdateInfo = () => {
		setIsUpdateUserInfo(true);
	};
	const { year, month } = formatDateTime(userData?.user?.create_at);
	const handleReload = () => {
		window.location.reload();
	};

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await axios.get("/api/user/myProfile");
				setUserData(response.data);
			} catch (error) {
				console.error("Error fetching user profile:", error);
			}
		};

		fetchUserData();
	}, []);
	return (
		<div className="PContent">
			{isUpdateUserInfo && (
				<UpdateUserInfo
					onClose={() => setIsUpdateUserInfo(false)}
					reload={handleReload}
					userData={userData}
					year={year}
					month={month}
				/>
			)}
			{userData && userData.user && (
				<div className="profileBoxW">
					<div className="profileBox">
						<div className="userDetailsW">
							<div className="userImg">
								<img src={userData.user.avatar} alt="" />
							</div>
							<div className="userDetails">
								<div className="name">{userData.user.fullName}</div>
								<div className="followCount">
									<div className="followed">
										<span>{userData.followingCount}</span>フォロー中
									</div>
									<div className="following">
										<span>{userData.followerCount}</span>フォロわー
									</div>
								</div>
								<div className="postCount">
									投稿<span>{userData.postsCount}</span>件
								</div>
								<div className="joinTime">
									{year}年月{month}からFunHubを利用しています。
								</div>
							</div>
						</div>
						<div className="btnBox">
							<div className="editBtn" onClick={handleShowUpdateInfo}>
								プロフィールを編集
							</div>
						</div>
					</div>
				</div>
			)}
			<div className="postContent"></div>
		</div>
	);
}

export default Profile;
