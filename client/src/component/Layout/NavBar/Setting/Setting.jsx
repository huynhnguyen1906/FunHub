import "./SettingBox.scss";
import { useRef, useEffect, useState } from "react";
import UpdateUserInfo from "~/component/UpdateUserInfo/UpdateUserInfo";
import PasswordChange from "../PasswordChange/PasswordChange";

function SettingBox({ onClose, handleShowChangeForgotPass }) {
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

	return (
		<div className="SettingBox" ref={settingRef}>
			{showUpdateUserInfo && (
				<UpdateUserInfo onClose={() => setShowUpdateUserInfo(false)} />
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
				<div className="settingItem">
					<i></i>
					<p>ログアウト</p>
				</div>
			</div>
		</div>
	);
}

export default SettingBox;
