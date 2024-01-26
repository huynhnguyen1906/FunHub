function TrendPost({ img, user, like }) {
	return (
		<div className="TrendPost">
			<div className="postImg">
				<img src={img} alt="" />
			</div>
			<div className="postText">
				<div className="postAuthor">
					投稿者: <span className="Author">{user}</span>
				</div>
				<div className="postInfo">
					<i></i>
					{like}
				</div>
			</div>
		</div>
	);
}

export default TrendPost;
