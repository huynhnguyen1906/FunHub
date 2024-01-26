import "./SideBar.scss";
import TrendPost from "./TrendPost/TrendPost";
import TrendUser from "./TrendUser/TrendUser";
const trendPostInfo = [
	{
		img: "https://i.ebayimg.com/images/g/13EAAOSw6ntZkwWq/s-l1200.webp",
		user: "HUYNH",
		like: 1254,
	},
	{
		img: "https://cdn1.vectorstock.com/i/1000x1000/62/65/troll-guy-meme-face-for-any-design-vector-10906265.jpg",
		user: "ばか",
		like: 625,
	},
	{
		img: "https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2019/05/03/1935518.jpg",
		user: "うあああ",
		like: 462,
	},
];
const trendUserInfo = [
	{
		img: "https://cdn.alongwalk.info/vn/wp-content/uploads/2022/10/14054048/image-100-y-tuong-avatar-cute-doc-dao-an-tuong-nhat-cho-ban-166567564777697.jpg",
		user: "LEAI",
		post: 351,
	},
	{
		img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcTMy2FOhsAH3MaIkUfzPTaCYhYXf4jNVi0A&usqp=CAU",
		user: "UWD",
		post: 124,
	},
	{
		img: "https://file.vfo.vn/hinh/2014/5/anh-dai-dien-facebook-14.jpg",
		user: "EJE",
		post: 72,
	},
];
function SideBar() {
	return (
		<div className="SideBar">
			<div className="sideSearchB">
				<div className="sideSearchBW">
					<input type="text" placeholder="検索。。。" />
				</div>
			</div>
			<div className="trendPostBox">
				<div className="title">トレンド投稿</div>
				{trendPostInfo.map((info, index) => (
					<TrendPost
						key={index}
						img={info.img}
						user={info.user}
						like={info.like}
					/>
				))}
			</div>
			<div className="trendUserBox">
				<div className="title">トップアクティブユーザー</div>
				{trendUserInfo.map((info, index) => (
					<TrendUser
						key={index}
						img={info.img}
						user={info.user}
						post={info.post}
					/>
				))}
			</div>
		</div>
	);
}

export default SideBar;
