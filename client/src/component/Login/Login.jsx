import "./style.scss";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
function Login({ onClose, setShowAccountCreate }) {
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");

	const showSignIn = () => {
		onClose();
		setShowAccountCreate(true);
	};

	const [alertText, setAlertText] = useState("");
	const navigate = useNavigate();
	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			await axios.post("/api/user/login", {
				usernameOrEmail: userName,
				password: password,
			});

			setUserName("");
			setPassword("");
			setAlertText("");
			navigate("/home");
			onClose();
			window.location.reload();
		} catch (error) {
			console.error("Error during login:", error);

			setAlertText("ユーザーネームまたはパスワードが間違っています。");
		}
	};
	const userRef = useRef();
	useEffect(() => {
		userRef.current.focus();
	}, []);
	return (
		<div
			className="loginDp"
			onClick={(e) => {
				if (e.target === e.currentTarget) {
					onClose();
				}
			}}
		>
			<div className="loginForm">
				<div className="LWrap">
					<h1>ログイン</h1>
					<div className="closeBtn" onClick={onClose}>
						<span></span>
					</div>

					<div className="inputForm">
						<form>
							<div className="input">
								<input
									ref={userRef}
									onChange={(e) => {
										setUserName(e.target.value);
									}}
									type="text"
									name="email"
									autoComplete="off"
									placeholder="メールアドレスまたはユーザーネーム"
								/>
							</div>
							<div className="input">
								<input
									onChange={(e) => {
										setPassword(e.target.value);
									}}
									type="password"
									name="password"
									autoComplete="off"
									placeholder="パスワード"
								/>
							</div>
							<p className="alert">{alertText}</p>
							<button type="submit" onClick={handleSubmit}>
								ログイン
							</button>
						</form>
						<div className="btnBox">
							<p>パスワードを忘れた場合</p>
							<div className="bar"></div>
							<button onClick={showSignIn}>新しいアカウントを作成</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
