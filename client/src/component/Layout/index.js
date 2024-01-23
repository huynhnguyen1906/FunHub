import NavBar from "./NavBar";
import SideBar from "./SideBar";

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
