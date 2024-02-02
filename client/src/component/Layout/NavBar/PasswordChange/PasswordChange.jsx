import "./PasswordChange.scss";
import { useState } from "react";

const alert = {
	password: {
		confirm: "パスワードが一致しません。",
		format: "パスワードは半角英数字記号で入力してください。",
		length: "パスワードは8文字以上32文字以下で入力してください。",
		wrong: "現在のパスワードが間違っています。",
	},
	confirm: "入力している情報は足りていません。",
};

const userPassword = "password"; // This is a mock user password
function PasswordChange({ onClose, handleShowChangeForgotPass }) {
	const [password, setPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [passwordAlert, setPasswordAlert] = useState("");
	const [passwordConfirmAlert, setPasswordConfirmAlert] = useState("");
	const [confirmAlert, setConfirmAlert] = useState("");
	const resetAlerts = () => {
		setConfirmAlert("");
		setPasswordAlert("");
		setPasswordConfirmAlert("");
	};

	const handlePasswordChange = () => {
		const passwordFormat = /^[a-zA-Z0-9!@#$%^&*()_+{}[\]:;<>,.?~\\/-]+$/;
		if (!password || !newPassword || !confirmPassword) {
			resetAlerts();
			setConfirmAlert(alert.confirm);
		} else if (password !== userPassword) {
			resetAlerts();
			setPasswordAlert(alert.password.wrong);
		} else if (newPassword !== confirmPassword) {
			resetAlerts();
			setPasswordConfirmAlert(alert.password.confirm);
		} else if (!passwordFormat.test(newPassword)) {
			resetAlerts();
			setPasswordAlert(alert.password.format);
		} else if (newPassword.length < 8 || newPassword.length > 32) {
			resetAlerts();
			setPasswordAlert(alert.password.length);
		} else {
			// Send the new password to the server
			console.log("Password changed");
		}
	};

	return (
		<div
			className="PasswordChangeDp"
			onClick={(e) => {
				if (e.target === e.currentTarget) {
					onClose();
				}
			}}
		>
			<div className="pwChangeB">
				<div className="title">
					<p>パスワード変更</p>
					<div className="closeBtn" onClick={onClose}>
						<span></span>
					</div>
				</div>
				<div className="inputBox">
					<form>
						<input
							type="password"
							placeholder="現在のパスワード"
							onChange={(e) => setPassword(e.target.value)}
							name="password"
							autoComplete="off"
						/>
						<span className="alert">{passwordAlert}</span>
						<input
							type="password"
							placeholder="新しいパスワード"
							onChange={(e) => setNewPassword(e.target.value)}
							autoComplete="off"
						/>
						<input
							type="password"
							placeholder="新しいパスワードの確認"
							onChange={(e) => setConfirmPassword(e.target.value)}
							autoComplete="off"
						/>
						<span className="alert">{passwordConfirmAlert}</span>
					</form>
					<div
						className="forgotPass"
						onClick={() => {
							handleShowChangeForgotPass();
							onClose();
						}}
					>
						パスワードを忘れた場合
					</div>
				</div>
				<div className="bar"></div>
				<div className="confirmBtnB">
					<div className="btn" onClick={handlePasswordChange}>
						パスワード変更
					</div>
				</div>
				<span className="alert">{confirmAlert}</span>
			</div>
		</div>
	);
}

export default PasswordChange;
