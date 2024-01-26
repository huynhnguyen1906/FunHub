function NotiBox({ type, userName, time }) {
	return (
		<div className="notiBoxS">
			<div className="notiBoxW">
				<div className="userIcon"></div>
				<div className="notiTextB">
					<p className="notiText">
						<span className="username">{userName}</span>
						{type}
						<span className="notiTime">{time}</span>
					</p>
				</div>
				<div className="NotiCtn"></div>
			</div>
		</div>
	);
}

export default NotiBox;
