import "./Notification.scss";
function Notification({ onClose }) {
	return (
		<div
			className="Notification"
			onClick={(e) => {
				if (e.target === e.currentTarget) {
					onClose();
				}
			}}
		>
			<h1>Notification</h1>
		</div>
	);
}

export default Notification;
