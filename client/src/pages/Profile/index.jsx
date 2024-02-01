import { useState } from "react";
import "./style.scss";
import UpdateUserInfo from "../../component/UpdateUserInfo/UpdateUserInfo";

const user = {
	name: "QTaro",
	icon: "https://imgflip.com/s/meme/Scared-Cat.jpg",
	followed: 164,
	following: 468,
	post: 53,
	joinTime: { year: 2024, month: 1, day: 7 },
};

function Profile() {
	const [isUpdateUserInfo, setIsUpdateUserInfo] = useState(false);

	const handleShowUpdateInfo = () => {
		setIsUpdateUserInfo(true);
	};

	const handleReload = () => {
		window.location.reload();
	};
	return (
		<div className="PContent">
			{isUpdateUserInfo && (
				<UpdateUserInfo
					onClose={() => setIsUpdateUserInfo(false)}
					reload={handleReload}
				/>
			)}
			<div className="profileBoxW">
				<div className="profileBox">
					<div className="userDetailsW">
						<div className="userImg">
							<img src={user.icon} alt="" />
						</div>
						<div className="userDetails">
							<div className="name">{user.name}</div>
							<div className="followCount">
								<div className="followed">
									<span>{user.followed}</span>フォロー中
								</div>
								<div className="following">
									<span>{user.following}</span>フォロわー
								</div>
							</div>
							<div className="postCount">
								投稿<span>{user.post}</span>件
							</div>
							<div className="joinTime">
								{user.joinTime.year}年{user.joinTime.month}
								月からFunHubを利用しています。
							</div>
						</div>
					</div>
					<div className="btnBox">
						<div className="editBtn" onClick={handleShowUpdateInfo}>
							プロフィールを編集
						</div>
						<div className="settingBtn"></div>
					</div>
				</div>
			</div>
			<div className="postContent"></div>
		</div>
	);
}

export default Profile;
