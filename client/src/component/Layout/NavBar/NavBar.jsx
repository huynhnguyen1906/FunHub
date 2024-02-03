import "./NavBar.scss";
import { useState, useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import NavItem from "./NavItem/NavItem";
import Notification from "~/component/Noti/Notification";
import CrPostDpNav from "~/component/CreatePost/CreatePDpNav/CreatePostDp";
import LoginBtn from "./loginBtn/loginBtn";
import Login from "~/component/Login/Login";
import AccountCreate from "~/component/AccountCreate/AccountCreate";
import SettingBox from "./Setting/Setting";
import ChangeForgotPass from "~/component/ChangeForgotPass/ChangeForgotPass";

const navItem = ["ホーム", "トレンド", "通知", "検索", "プロフィール", "作成"];

function NavBar() {
	const [userData, setUserData] = useState(null);
	const navigate = useNavigate();
	const location = useLocation();

	const [activeComponent, setActiveComponent] = useState(null);
	const [isNotificationActive, setIsNotificationActive] = useState(false);
	let initialActiveItem;
	if (location.pathname === "/home") {
		initialActiveItem = 0;
	} else if (location.pathname === "/trending") {
		initialActiveItem = 1;
	} else if (location.pathname === "/search") {
		initialActiveItem = 3;
	} else if (location.pathname === "/profile") {
		initialActiveItem = 4;
	} else if (location.pathname !== "/create") {
		initialActiveItem = navItem.findIndex(
			(item) => `/${item.toLowerCase()}` === location.pathname
		);
	}
	const [activeItem, setActiveItem] = useState(initialActiveItem);
	const handleClick = (item, index) => {
		if (
			userData === null &&
			(item === "通知" || item === "作成" || item === "プロフィール")
		) {
			alert("ログインしてください。");
			return;
		}

		setActiveItem(index);
		if (item === "通知") {
			setActiveComponent(<Notification onClose={closeNotification} />);
			setIsNotificationActive(true);
		} else if (item === "作成") {
			setActiveComponent(<CrPostDpNav onClose={closeCreatePost} />);
			setIsNotificationActive(false);
		} else {
			setActiveComponent(null);
			setIsNotificationActive(false);
		}

		if (item === "ホーム") {
			navigate("/home");
		} else if (item === "トレンド") {
			navigate("/trending");
		} else if (item === "検索") {
			navigate("/search");
		} else if (item === "プロフィール") {
			navigate("/profile");
		}
	};
	const closeNotification = () => {
		setActiveComponent(null);
		setIsNotificationActive(false);
		setActiveItem(activeItem);
	};
	const closeCreatePost = () => {
		setActiveComponent(null);
		setIsNotificationActive(false);
	};
	const handleGoHome = () => {
		navigate("/home");
		setActiveItem(0);
		setActiveComponent(null);
		setIsNotificationActive(false);
	};

	const [showAccountCreate, setShowAccountCreate] = useState(false);

	const handleShowAccountCreate = useCallback(() => {
		setShowAccountCreate(true);
	}, []);
	const [showLogin, setShowLogin] = useState(false);
	const handleShowLogin = () => {
		setShowLogin(true);
	};

	const [showSetting, setShowSetting] = useState(false);
	const handleShowSetting = () => {
		setShowSetting(true);
	};
	const handleCloseSetting = () => {
		setShowSetting(false);
	};

	const [showChangeForgotPass, setShowChangeForgotPass] = useState(false);
	const handleShowChangeForgotPass = () => {
		setShowChangeForgotPass(true);
	};
	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await axios.get("/api/user/myProfile");
				setUserData(response.data);
			} catch (error) {
				console.error("Error fetching user profile:", error);
			}
		};

		fetchUserData();
	}, []);
	return (
		<div className="navBar">
			{showLogin && (
				<Login
					setShowAccountCreate={handleShowAccountCreate}
					onClose={() => setShowLogin(false)}
					onShowChangeForgotPass={handleShowChangeForgotPass}
				/>
			)}
			{showAccountCreate && (
				<AccountCreate
					onClose={() => setShowAccountCreate(false)}
					setShowLogin={setShowLogin}
				/>
			)}
			{showChangeForgotPass && (
				<ChangeForgotPass onClose={() => setShowChangeForgotPass(false)} />
			)}
			{activeComponent}
			<div className="wrap">
				<div className="NavTop">
					<div className="logoWrap">
						<div className="logo" onClick={handleGoHome}>
							<div className="logoImg"></div>
							<div className={`FunHub ${isNotificationActive ? "hidden" : ""}`}>
								FunHub
							</div>
						</div>
					</div>

					<div className="NItemWrap">
						{navItem.map((item, index) => (
							<div
								className={`navItem ${activeItem === index ? "active" : ""}`}
								key={index}
								onClick={() => handleClick(item, index)}
							>
								<div className="icon"></div>
								{!isNotificationActive && <NavItem item={item} />}
							</div>
						))}
					</div>
				</div>
				<div className="NavBottom">
					{showSetting && (
						<SettingBox
							onClose={handleCloseSetting}
							setShowLogin={setShowLogin}
							handleShowChangeForgotPass={handleShowChangeForgotPass}
						/>
					)}
					{userData && userData.user ? (
						<div className={`bWrap ${isNotificationActive ? "center" : ""}`}>
							<div
								className={`userBox ${isNotificationActive ? "hidden" : ""}`}
							>
								<div className="userImg">
									<img src={userData.user.avatar} alt="" />
								</div>
								<div className="userName">{userData.user.fullName}</div>
							</div>
							<div className="settingIcon" onClick={handleShowSetting}></div>
						</div>
					) : (
						<LoginBtn onClick={handleShowLogin} />
					)}
				</div>
			</div>
		</div>
	);
}

export default NavBar;
