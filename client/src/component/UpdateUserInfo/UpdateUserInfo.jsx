import "./UpdateUserInfo.scss";
import { useState, useRef } from "react";
const user = {
	name: "QTaro",
	icon: "https://imgflip.com/s/meme/Scared-Cat.jpg",
	followed: 164,
	following: 468,
	post: 53,
	joinTime: { year: 2024, month: 1, day: 7 },
	mail: "qtaro@gmail.com",
};
const emailFormat =
	/^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
function UpdateUserInfo({ onClose, reload }) {
	const avatarInputRef = useRef();
	const [name, setName] = useState(user.name);
	const [email, setEmail] = useState(user.mail);
	const [avatar, setAvatar] = useState(user.icon);

	const handleChangeAvatar = (event) => {
		const file = event.target.files[0];
		if (file) {
			const fileUrl = URL.createObjectURL(file);
			setAvatar(fileUrl);
		}
	};
	const handleClickChangeAvatar = (e) => {
		avatarInputRef.current.click();
	};

	const handleSubmit = () => {
		if (!name || !email) {
			alert("入力している情報は足りていません。");
		} else if (!emailFormat.test(email)) {
			alert("有効なメールアドレスを入力してください。");
		} else {
			alert("送信しました。");
			onClose();
			reload();
		}
	};
	return (
		<div
			className="PUpdateDP"
			onClick={(e) => {
				if (e.target === e.currentTarget) {
					onClose();
				}
			}}
		>
			<div className="updateBoxW">
				<div className="updateBox">
					<div className="userDetailsW">
						<div className="userImg">
							<img src={avatar} alt="" />
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
						<div className="editBtn" onClick={handleClickChangeAvatar}>
							写真変更
						</div>
						<input
							type="file"
							ref={avatarInputRef}
							accept="image/*"
							style={{ display: "none" }}
							onChange={handleChangeAvatar}
						/>
					</div>
				</div>
				<div className="inputBox">
					<div className="nameB">
						<div className="label">名前：</div>
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className="emailB">
						<div className="label">メールアドレス</div>
						<input
							type="text"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div
						className="btn"
						onClick={() => {
							handleSubmit();
						}}
					>
						送信する
					</div>
				</div>
			</div>
		</div>
	);
}

export default UpdateUserInfo;
