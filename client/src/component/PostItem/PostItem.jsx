import "./PostItem.scss";
import PMain from "./PMain/PMain";
function PostItem() {
	return (
		<div className="PostItem">
			<div className="pItemTop">
				<div className="userInfoW">
					<div className="userInfo">
						<div className="userInfoK">
							<div className="userIcon">
								<img src="" alt="" />
							</div>
							<div className="userName">QTaro</div>
						</div>
						<div className="postTime">ｘ時間前</div>
					</div>
					<div className="btn">
						<span></span>
					</div>
				</div>
				<div className="PTextW">
					<div className="PText">
						It is a long established fact that a reader will be distracted by
						the readable content of a page when looking at its layout. The point
						of using Lorem Ipsum is that it has a more-or-less normal
						distribution of letters, as opposed to using 'Content here, content
						here', making it look like readable English.
					</div>
				</div>
			</div>
			<div className="PMainW">
				<PMain />
			</div>
			<div className="pItemBottom">
				<div className="btnBox">
					<div className="btn"></div>
					<div className="btn"></div>
					<div className="btn"></div>
				</div>
			</div>
		</div>
	);
}

export default PostItem;
