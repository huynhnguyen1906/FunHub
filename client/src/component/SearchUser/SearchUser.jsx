function SearchUser({ user }) {
	return (
		<div className="searchUser">
			<div className="userInfo">
				<div className="userIcon">
					<img src={user.icon} alt="" />
				</div>
				<div className="userText">
					<div className="name">{user.name}</div>
					<div className="followCount">フォローワ{user.followCount}人</div>
				</div>
			</div>
			<button className={`followBtn ${user.follow ? "followed" : ""}`}>
				{user.follow ? "フォロー中" : "フォローする"}
			</button>
		</div>
	);
}

export default SearchUser;
