function MediaInput({ file, onDelete }) {
	const fileURL = URL.createObjectURL(file);
	const isVideo = file.type.startsWith("video");
	return (
		<div className="mediaInputContent">
			<div className="deleteBtn" onClick={onDelete}>
				<span></span>
			</div>
			{isVideo ? (
				<div>
					<span></span>
					<video src={fileURL} />
				</div>
			) : (
				<div>
					<img src={fileURL} alt="" />
				</div>
			)}
		</div>
	);
}

export default MediaInput;
