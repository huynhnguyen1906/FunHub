import "./style.scss";
import { useState } from "react";
import SearchUser from "~/component/SearchUser/SearchUser";

const userResult = [
	{
		name: "abc",
		icon: "https://i.kym-cdn.com/entries/icons/original/000/046/895/huh_cat.jpg",
		followCount: 203,
		follow: true,
	},
	{
		name: "def",
		icon: "https://i.pinimg.com/736x/b9/c4/7e/b9c47ef70bff06613d397abfce02c6e7.jpg",
		followCount: 40,
		follow: false,
	},
	{
		name: "ghi",
		icon: "https://i.pinimg.com/736x/b9/c4/7e/b9c47ef70bff06613d397abfce02c6e7.jpg",
		followCount: 80,
		follow: true,
	},
	{
		name: "jkl",
		icon: "https://uploads.dailydot.com/2018/10/olli-the-polite-cat.jpg?q=65&auto=format&w=2270&ar=2:1&fit=crop",
		followCount: 33,
		follow: false,
	},
	{
		name: "mno",
		icon: "https://i.kym-cdn.com/entries/icons/original/000/046/895/huh_cat.jpg",
		followCount: 654,
		follow: true,
	},
	{
		name: "pqr",
		icon: "https://i.pinimg.com/736x/b9/c4/7e/b9c47ef70bff06613d397abfce02c6e7.jpg",
		followCount: 189,
		follow: false,
	},
	{
		name: "stu",
		icon: "https://uploads.dailydot.com/2018/10/olli-the-polite-cat.jpg?q=65&auto=format&w=2270&ar=2:1&fit=crop",
		followCount: 26,
		follow: false,
	},
	{
		name: "vwx",
		icon: "https://i.kym-cdn.com/entries/icons/original/000/046/895/huh_cat.jpg",
		followCount: 84,
		follow: true,
	},
	{
		name: "yz",
		icon: "https://i.kym-cdn.com/entries/icons/original/000/046/895/huh_cat.jpg",
		followCount: 30,
		follow: false,
	},
];

function Search() {
	const [displayedUsers, setDisplayedUsers] = useState(userResult.slice(0, 3));
	const [showText, setShowText] = useState("すべてを見る");
	const [isShowingAll, setIsShowingAll] = useState(false);
	const [searchText, setSearchText] = useState("");

	const handleSeeAllClick = () => {
		if (isShowingAll) {
			setDisplayedUsers(userResult.slice(0, 3));
			setShowText("すべてを見る");
		} else {
			setDisplayedUsers(userResult);
			setShowText("閉じる");
		}
		setIsShowingAll(!isShowingAll);
	};

	return (
		<div className="SContent">
			<div className="searchBarW">
				<div className="searchBar">
					<input
						type="text"
						placeholder="検索。。。"
						onChange={(e) => setSearchText(e.target.value)}
						value={sessionStorage.getItem("searchText") || searchText}
						onKeyDown={(e) => {
							if (e.key === "Enter" && searchText !== "") {
								console.log(searchText);
								setSearchText("");
								sessionStorage.setItem("searchText", searchText);
							} else if (e.key === "Enter" && searchText === "") {
								alert("検索内容を入力してください。");
							}
						}}
					/>
				</div>
			</div>
			<div className="userResult">
				<div className="title">
					<h2>投稿者</h2>
				</div>
				{displayedUsers.map((user, index) => (
					<SearchUser key={index} user={user} />
				))}
				<div className="seeAll" onClick={handleSeeAllClick}>
					{showText}
				</div>
			</div>
			<div className="postResult"></div>
		</div>
	);
}

export default Search;
