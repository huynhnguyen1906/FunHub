function TrendUser({ img, user, post }) {
	return (
		<div className="TrendUser">
			<div className="userImg">
				<img src={img} alt="" />
			</div>
			<div className="userText">
				<div className="user">{user}</div>
				<div className="userInfo">投稿した数：{post}</div>
			</div>
		</div>
	);
}

export default TrendUser;
