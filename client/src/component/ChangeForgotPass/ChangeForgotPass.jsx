import "./ChangeForgotPass.scss";
import { useState } from "react";

const alert = {
	password: {
		confirm: "パスワードが一致しません。",
		format: "パスワードは半角英数字記号で入力してください。",
		length: "パスワードは8文字以上32文字以下で入力してください。",
	},
	confirm: "入力している情報は足りていません。",
	mail: "メールアドレスが間違っています。",
};

const userMail = "abc@gmail.com"; // This is a mock user mail

function ChangeForgotPass({ onClose }) {
	const [mail, setMail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [mailAlert, setMailAlert] = useState("");
	const [passwordAlert, setPasswordAlert] = useState("");
	const [confirmAlert, setConfirmAlert] = useState("");
	const resetAlerts = () => {
		setConfirmAlert("");
		setMailAlert("");
		setPasswordAlert("");
	};

	const handlePasswordChange = () => {
		const passwordFormat = /^[a-zA-Z0-9!@#$%^&*()_+{}[\]:;<>,.?~\\/-]+$/;
		if (!mail || !password || !confirmPassword) {
			resetAlerts();
			setConfirmAlert(alert.confirm);
		} else if (mail !== userMail) {
			resetAlerts();
			setMailAlert(alert.mail);
		} else if (password !== confirmPassword) {
			resetAlerts();
			setPasswordAlert(alert.password.confirm);
		} else if (!passwordFormat.test(password)) {
			resetAlerts();
			setPasswordAlert(alert.password.format);
		} else if (password.length < 8 || password.length > 32) {
			resetAlerts();
			setPasswordAlert(alert.password.length);
		} else {
			// Send the new password to the server
			console.log("Password changed");
		}
	};

	return (
		<div
			className="ChangeForgotPassDp"
			onClick={(e) => {
				if (e.target === e.currentTarget) {
					onClose();
				}
			}}
		>
			<div className="ChangeForgotPassBox">
				<div className="title">
					<p>パスワード変更</p>
					<div className="closeBtn" onClick={onClose}>
						<span></span>
					</div>
				</div>
				<div className="inputBox">
					<form>
						<input
							type="text"
							placeholder="メールアドレスを入力"
							name="mail"
							autoComplete="off"
							onChange={(e) => {
								setMail(e.target.value);
							}}
						/>
						<span className="alert">{mailAlert}</span>
						<input
							type="password"
							placeholder="新しいパスワード"
							autoComplete="off"
							onChange={(e) => {
								setPassword(e.target.value);
							}}
						/>
						<input
							type="password"
							placeholder="新しいパスワードの確認"
							autoComplete="off"
							onChange={(e) => {
								setConfirmPassword(e.target.value);
							}}
						/>
						<span className="alert">{passwordAlert}</span>
					</form>
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

export default ChangeForgotPass;
