import NavBar from "./NavBar/NavBar";
import SideBar from "./SideBar/SideBar";
import "./style.scss";
function DefaultLayout({ children }) {
	return (
		<div className="container">
			<NavBar />
			<div className="main">
				<div className="mainContent">{children}</div>
				<SideBar />
			</div>
		</div>
	);
}

export default DefaultLayout;
