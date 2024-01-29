function PMain({ media, post, Click }) {
	const handleClick = () => {
		Click(post, post.media.id);
	};
	return (
		<div className="PMain" onClick={handleClick}>
			{media.type === "video" ? (
				<>
					<video controls={post.media.length === 1} src={media.url} />
					{post.media.length > 2 && (
						<div className="videoW">
							<span></span>
						</div>
					)}
				</>
			) : (
				<img src={media.url} alt="" />
			)}
		</div>
	);
}

export default PMain;
