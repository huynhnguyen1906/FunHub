import "./style.scss";
import React, { useState } from "react";
import Select from "react-select";

function SigIn() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");

	const [selectedDay, setSelectedDay] = useState(null);
	const [selectedMonth, setSelectedMonth] = useState(null);
	const [selectedYear, setSelectedYear] = useState(null);

	const daysOptions = [...Array(31).keys()].map((day) => ({
		value: day + 1,
		label: `${day + 1}`,
	}));
	const monthsOptions = [
		{ value: 1, label: "1月" },
		{ value: 2, label: "2月" },
		{ value: 3, label: "3月" },
		{ value: 4, label: "4月" },
		{ value: 5, label: "5月" },
		{ value: 6, label: "6月" },
		{ value: 7, label: "7月" },
		{ value: 8, label: "8月" },
		{ value: 9, label: "9月" },
		{ value: 10, label: "10月" },
		{ value: 11, label: "11月" },
		{ value: 12, label: "12月" },
	];
	const yearsOptions = [...Array(100).keys()].map((year) => ({
		value: 2022 - year,
		label: `${2022 - year}`,
	}));

	const handleDayChange = (selectedOption) => {
		setSelectedDay(selectedOption);
	};

	const handleMonthChange = (selectedOption) => {
		setSelectedMonth(selectedOption);
	};

	const handleYearChange = (selectedOption) => {
		setSelectedYear(selectedOption);
	};
	const [sex, setSex] = useState("");

	const handleOptionChange = (event) => {
		setSex(event.target.value);
	};

	const [mailAlert, setMailAlert] = useState("");
	const [passwordAlert, setPasswordAlert] = useState("");
	const [confirmAlert, setConfirmAlert] = useState("");

	const alert = {
		mail: "有効なメールアドレスを入力してください。",
		password: {
			confirm: "パスワードが一致しません。",
			format: "パスワードは半角英数字記号で入力してください。",
			length: "パスワードは8文字以上32文字以下で入力してください。",
		},
		confirm: "入力している情報は足りていません。",
	};
	const handleSubmit = () => {
		const Format = /^[a-zA-Z0-9!@#$%^&*()_+{}[\]:;<>,.?~\\/-]+$/;
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
		} else if (
			!email.includes("@") ||
			!email.includes(".com") ||
			!Format.test(email)
		) {
			setMailAlert(alert.mail);
		} else if (password !== passwordConfirm) {
			setPasswordAlert(alert.password.confirm);
		} else if (!Format.test(password)) {
			setPasswordAlert(alert.password.format);
		} else if (password.length < 8 || password.length > 32) {
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
		}
	};

	return (
		<div className="sigInDp">
			<div className="sigInform">
				<div className="AvsFgaW">
					<div className="formTitle">
						<p>アカウント登録</p>
						<p>簡単に登録できます。</p>
						<div className="closeBtn">
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
						もうアカウントを登録しました？<span>ここに</span>ログイン
					</p>
				</div>
			</div>
		</div>
	);
}

export default SigIn;
