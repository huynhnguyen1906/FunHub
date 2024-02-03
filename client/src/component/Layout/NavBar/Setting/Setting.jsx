import "./SettingBox.scss";
import { useRef, useEffect, useState } from "react";
import UpdateUserInfo from "~/component/UpdateUserInfo/UpdateUserInfo";
import PasswordChange from "../PasswordChange/PasswordChange";
import axios from "axios";

function SettingBox({ onClose, handleShowChangeForgotPass, userData }) {
	const settingRef = useRef();

	const [showUpdateUserInfo, setShowUpdateUserInfo] = useState(false);
	const handleShowUpdateUserInfo = () => {
		setShowUpdateUserInfo(true);
	};

	const [showPasswordChange, setShowPasswordChange] = useState(false);
	const handleShowPasswordChange = () => {
		setShowPasswordChange(true);
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (settingRef.current && !settingRef.current.contains(event.target)) {
				onClose();
			}
		};

		window.addEventListener("mousedown", handleClickOutside);

		return () => {
			window.removeEventListener("mousedown", handleClickOutside);
		};
	}, [onClose]);
	const handleReload = () => {
		window.location.reload();
	};
	const handleLogout = async () => {
		try {
			const response = await axios.post("/api/user/logout");

			if (response.status === 200) {
				console.log("User logged out");
				window.location.reload();
			} else {
				console.error("Error logging out");
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="SettingBox" ref={settingRef}>
			{showUpdateUserInfo && (
				<UpdateUserInfo
					onClose={() => setShowUpdateUserInfo(false)}
					userData={userData}
					reload={handleReload}
				/>
			)}
			{showPasswordChange && (
				<PasswordChange
					onClose={() => setShowPasswordChange(false)}
					handleShowChangeForgotPass={handleShowChangeForgotPass}
				/>
			)}
			<div className="settingItemBox">
				<div className="settingItem" onClick={handleShowUpdateUserInfo}>
					<i></i>
					<p>プロフィールを編集</p>
				</div>
				<div className="settingItem">
					<i></i>
					<p>表示を切り替える</p>
				</div>
				<div className="settingItem">
					<i></i>
					<p>問題を報告</p>
				</div>
				<div className="bar"></div>
				<div className="settingItem">
					<i></i>
					<p>アドミンページ</p>
				</div>
				<div className="settingItem" onClick={handleShowPasswordChange}>
					<i></i>
					<p>パスワード変更</p>
				</div>
				<div className="settingItem" onClick={handleLogout}>
					<i></i>
					<p>ログアウト</p>
				</div>
			</div>
		</div>
	);
}

export default SettingBox;
