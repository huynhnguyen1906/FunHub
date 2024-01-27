import "./NavBar.scss";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavItem from "./NavItem/NavItem";
import Notification from "~/component/Noti/Notification";
import CrPostDpNav from "~/component/CreatePost/CreatePDpNav/CreatePostDp";
const user = {
	name: "QTaro",
	icon: "https://imgflip.com/s/meme/Scared-Cat.jpg",
};
const navItem = ["ホーム", "トレンド", "通知", "検索", "プロフィール", "作成"];

function NavBar() {
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
		setActiveItem(index);
		if (item === "通知") {
			setActiveComponent(<Notification onClose={closeNotification} />);
			setIsNotificationActive(true);
			setActiveItem(index);
		} else if (item === "作成") {
			setActiveComponent(<CrPostDpNav onClose={closeCreatePost} />);
			setIsNotificationActive(false);
			setActiveItem(activeItem);
		} else {
			setActiveComponent(null);
			setIsNotificationActive(false);
			setActiveItem(index);
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
	return (
		<div className="navBar">
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
					<div className={`bWrap ${isNotificationActive ? "center" : ""}`}>
						<div className={`userBox ${isNotificationActive ? "hidden" : ""}`}>
							<div className="userImg">
								<img src={user.icon} alt="" />
							</div>
							<div className="userName">{user.name}</div>
						</div>
						<div className="settingIcon"></div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default NavBar;
