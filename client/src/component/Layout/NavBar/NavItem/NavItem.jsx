import "./NavItem.scss";

function NavItem({ item }) {
	return (
		<div className="item">
			<div>{item}</div>
		</div>
	);
}

export default NavItem;
