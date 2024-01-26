function NotiBox({ type, userName, time, userIcon, content }) {
	return (
		<div className="notiBoxS">
			<div className="notiBoxW">
				<div className="userIcon">
					<img src={userIcon} alt="" />
				</div>
				<div className="notiTextB">
					<p className="notiText">
						<span className="username">{userName}</span>
						{type}
						<span className="notiTime">{time}</span>
					</p>
				</div>
				<div className="NotiCtn">
					<img src={content} alt="" />
				</div>
			</div>
		</div>
	);
}

export default NotiBox;
