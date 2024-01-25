import "./NavBar.scss";
import NavItem from "./NavItem/NavItem";

const navItem = ["ホーム", "トレンド", "通知", "検索", "プロフィール", "作成"];
function NavBar() {
	return (
		<div className="navBar">
			<div className="wrap">
				<div className="logoWrap">
					<div className="logo">
						<div className="logoImg"></div>
						<div className="FunHub">FunHub</div>
					</div>
				</div>
				<div className="NItemWrap">
					{navItem.map((item, index) => (
						<div className="navItem" key={index}>
							<div className="icon"></div>
							<NavItem item={item} />
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default NavBar;
