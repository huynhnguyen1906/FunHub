import "./UpdateUserInfo.scss";
import { useState, useRef } from "react";

const emailFormat =
	/^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
function UpdateUserInfo({ onClose, reload, userData, year, month }) {
	const avatarInputRef = useRef();
	const [name, setName] = useState(userData.user.fullName);
	const [email, setEmail] = useState(userData.user.email);
	const [avatar, setAvatar] = useState(userData.user.avatar);
	const [file, setFile] = useState(null);
	const handleChangeAvatar = (event) => {
		const file = event.target.files[0];
		if (file) {
			const fileUrl = URL.createObjectURL(file);
			setAvatar(fileUrl);
			setFile(file);
		}
	};

	const handleClickChangeAvatar = (e) => {
		avatarInputRef.current.click();
	};

	const handleSubmit = async () => {
		if (!name || !email) {
			alert("入力している情報は足りていません。");
		} else if (!emailFormat.test(email)) {
			alert("有効なメールアドレスを入力してください。");
		} else {
			const updateResponse = await fetch("/api/user/update-profile-info", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					fullName: name,
					email: email,
					avatar: avatar, // Use the current avatar URL
				}),
			});

			if (updateResponse.ok) {
				if (file) {
					const formData = new FormData();
					formData.append("media", file);
					const response = await fetch("/upload", {
						method: "POST",
						body: formData,
					});
					const data = await response.json();
					if (data.urls && data.urls.length > 0) {
						setAvatar(data.urls[0]);
						// Update the user info with the new avatar URL
						const updateAvatarResponse = await fetch(
							"/api/user/update-profile-info",
							{
								method: "POST",
								headers: {
									"Content-Type": "application/json",
								},
								body: JSON.stringify({
									fullName: name,
									email: email,
									avatar: data.urls[0],
								}),
							}
						);
						if (!updateAvatarResponse.ok) {
							alert("Avatar update failed.");
						}
					}
				}
				alert("送信しました。");
				onClose();
				reload();
			} else {
				await updateResponse.json();
				if (updateResponse.status === 409) {
					alert("このメールアドレスは既に登録されています。");
				} else {
					alert("更新に失敗しました。");
				}
			}
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
								{year}年{month} 月からFunHubを利用しています。
							</div>
						</div>
					</div>
					<div className="btnBox">
						<div className="editBtn" onClick={handleClickChangeAvatar}>
							写真変更
						</div>
						<input
							name="avatar"
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
							name="fullName"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className="emailB">
						<div className="label">メールアドレス</div>
						<input
							type="text"
							name="email"
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
