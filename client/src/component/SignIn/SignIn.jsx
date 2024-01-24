import "./style.scss";
import React, { useState, useCallback, useMemo } from "react";
import Select from "react-select";

function SignIn({ onClose, setShowLogin }) {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");

	const [selectedDay, setSelectedDay] = useState(null);
	const [selectedMonth, setSelectedMonth] = useState(null);
	const [selectedYear, setSelectedYear] = useState(null);

	const daysOptions = useMemo(() => {
		return Array.from({ length: 31 }, (_, i) => ({
			value: i + 1,
			label: i + 1,
		}));
	}, []);
	const monthsOptions = useMemo(() => {
		return Array.from({ length: 12 }, (_, i) => ({
			value: String(i + 1),
			label: `${i + 1} 月`,
		}));
	}, []);
	const yearsOptions = useMemo(() => {
		return Array.from({ length: 121 }, (_, i) => ({
			value: i + 1900,
			label: i + 1900,
		}));
	}, []);

	const handleDayChange = useCallback((selectedOption) => {
		setSelectedDay(selectedOption);
	}, []);

	const handleMonthChange = useCallback((selectedOption) => {
		setSelectedMonth(selectedOption);
	}, []);

	const handleYearChange = useCallback((selectedOption) => {
		setSelectedYear(selectedOption);
	}, []);
	const [sex, setSex] = useState("");

	const handleOptionChange = useCallback((event) => {
		setSex(event.target.value);
	}, []);

	const [mailAlert, setMailAlert] = useState("");
	const [passwordAlert, setPasswordAlert] = useState("");
	const [confirmAlert, setConfirmAlert] = useState("");
	const [userNameAlert, setUserNameAlert] = useState("");
	const resetAlerts = () => {
		setConfirmAlert("");
		setMailAlert("");
		setPasswordAlert("");
		setUserNameAlert("");
	};
	const alert = {
		mail: "有効なメールアドレスを入力してください。",
		password: {
			confirm: "パスワードが一致しません。",
			format: "パスワードは半角英数字記号で入力してください。",
			length: "パスワードは8文字以上32文字以下で入力してください。",
		},
		userName: "ユーザーネームは半角英数字で入力してください。",
		confirm: "入力している情報は足りていません。",
	};
	const handleSubmit = useCallback(() => {
		const passwordFormat = /^[a-zA-Z0-9!@#$%^&*()_+{}[\]:;<>,.?~\\/-]+$/;
		const userNameFormat = /^[a-zA-Z0-9]+$/;
		const emailFormat =
			/^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (
			!firstName ||
			!lastName ||
			!email ||
			!userName ||
			!password ||
			!passwordConfirm ||
			!(selectedDay && selectedDay.value) ||
			!(selectedMonth && selectedMonth.value) ||
			!(selectedYear && selectedYear.value) ||
			!sex
		) {
			setConfirmAlert(alert.confirm);
		} else if (!emailFormat.test(email)) {
			resetAlerts();
			setMailAlert(alert.mail);
		} else if (!userNameFormat.test(userName)) {
			resetAlerts();
			setUserNameAlert(alert.userName);
		} else if (password !== passwordConfirm) {
			resetAlerts();
			setPasswordAlert(alert.password.confirm);
		} else if (!passwordFormat.test(password)) {
			resetAlerts();
			setPasswordAlert(alert.password.format);
		} else if (password.length < 8 || password.length > 32) {
			resetAlerts();
			setPasswordAlert(alert.password.length);
		} else {
			console.log(
				"User Information:",
				firstName,
				lastName,
				email,
				userName,
				password,
				passwordConfirm,
				selectedDay && selectedDay.value,
				selectedMonth && selectedMonth.value,
				selectedYear && selectedYear.value,
				sex
			);
			setFirstName("");
			setLastName("");
			setEmail("");
			setUserName("");
			setPassword("");
			setPasswordConfirm("");
			setSelectedDay(null);
			setSelectedMonth(null);
			setSelectedYear(null);
			setSex("");
			setMailAlert("");
			setPasswordAlert("");
			setConfirmAlert("");
			onClose();
			setShowLogin(true);
		}
	}, [
		firstName,
		lastName,
		email,
		userName,
		password,
		passwordConfirm,
		selectedDay,
		selectedMonth,
		selectedYear,
		sex,
		alert.confirm,
		alert.mail,
		alert.password.confirm,
		alert.password.format,
		alert.password.length,
		alert.userName,
		onClose,
		setShowLogin,
	]);

	const showLogin = useCallback(() => {
		onClose();
		setShowLogin(true);
	}, [onClose, setShowLogin]);
	return (
		<div
			className="signInDp"
			onClick={(e) => {
				if (e.target === e.currentTarget) {
					onClose();
				}
			}}
		>
			<div className="signInform">
				<div className="AvsFgaW">
					<div className="formTitle">
						<p>アカウント登録</p>
						<p>簡単に登録できます。</p>
						<div className="closeBtn" onClick={onClose}>
							<span></span>
						</div>
					</div>
				</div>
				<div className="formContent">
					<form>
						<div className="formInput">
							<div className="nameInput">
								<input
									type="text"
									name="firstName"
									placeholder="姓"
									autoComplete="first-name"
									value={firstName}
									onChange={(e) => {
										setFirstName(e.target.value);
									}}
								/>
								<input
									type="text"
									name="lastName"
									placeholder="名"
									autoComplete="last-name"
									value={lastName}
									onChange={(e) => {
										setLastName(e.target.value);
									}}
								/>
							</div>
							<div className="FqsQsf">
								<div className="GgaWda">
									<input
										type="email"
										name="email"
										autoComplete="off"
										placeholder="メールアドレス"
										value={email}
										onChange={(e) => {
											setEmail(e.target.value);
										}}
									/>
									<p className="alert">{mailAlert}</p>
								</div>
								<div className="GgaWda">
									<input
										type="text"
										name="userName"
										placeholder="ユーザーネーム"
										autoComplete="off"
										value={userName}
										onChange={(e) => {
											setUserName(e.target.value);
										}}
									/>
									<p className="alert">{userNameAlert}</p>
								</div>
								<div className="GgaWda">
									<input
										type="password"
										name="password"
										autoComplete="off"
										placeholder="新しいパスワード(8~32文字)"
										value={password}
										onChange={(e) => {
											setPassword(e.target.value);
										}}
									/>
								</div>
								<div className="GgaWda">
									<input
										type="password"
										autoComplete="off"
										placeholder="新しいパスワード再入力"
										value={passwordConfirm}
										onChange={(e) => {
											setPasswordConfirm(e.target.value);
										}}
									/>
									<p className="alert">{passwordAlert}</p>
								</div>
							</div>
						</div>
						<div className="dateBox">
							<div className="labelText">
								<p>誕生日</p>
							</div>
							<div className="dateSelect">
								<Select
									value={selectedDay}
									onChange={handleDayChange}
									options={daysOptions}
									placeholder="日"
									className="select"
								/>

								<Select
									value={selectedMonth}
									onChange={handleMonthChange}
									options={monthsOptions}
									className="select"
									placeholder="月"
								/>

								<Select
									value={selectedYear}
									onChange={handleYearChange}
									options={yearsOptions}
									placeholder="年"
									className="select"
								/>
							</div>
						</div>
						<div className="sexCheck">
							<div className="labelText">
								<p>性別</p>
							</div>
							<div className="checkBox">
								<div className="checkItem">
									<label className="WaqSGe">
										男性
										<input
											type="radio"
											value="男性"
											checked={sex === "男性"}
											onChange={handleOptionChange}
										/>
									</label>
								</div>
								<div className="checkItem">
									<label className="WaqSGe">
										女性
										<input
											type="radio"
											value="女性"
											checked={sex === "女性"}
											onChange={handleOptionChange}
										/>
									</label>
								</div>
								<div className="checkItem">
									<label className="WaqSGe">
										カスタム
										<input
											type="radio"
											value="カスタム"
											checked={sex === "カスタム"}
											onChange={handleOptionChange}
										/>
									</label>
								</div>
							</div>
						</div>
					</form>
					<p>
						[アカウント登録]をクリックすることで、<span>利用規約</span>、
						<span>Cookieポリシー</span>に同意するものとします。
					</p>
					<div className="btnBox">
						<button onClick={handleSubmit}>アカウント登録</button>
					</div>
					<p className="alert">{confirmAlert}</p>
					<p>
						もうアカウントを登録しました？
						<span onClick={showLogin}>ここに</span>ログイン
					</p>
				</div>
			</div>
		</div>
	);
}

export default SignIn;
