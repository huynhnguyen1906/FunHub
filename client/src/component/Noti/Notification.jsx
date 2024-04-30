import "./Notification.scss";
import NotiBox from "./NotiCnt/NotiCnt";

const notiData = [
	{
		type: "like",
		userName: "takuto",
		time: "2024-01-26T00:09:26.535Z",
		userIcon:
			"https://i.pinimg.com/236x/7e/3b/b2/7e3bb2b4059cceb64279789d228e2da2.jpg",
		content:
			"https://static01.nyt.com/images/2021/04/30/multimedia/30xp-meme/29xp-meme-articleLarge-v3.jpg?quality=75&auto=webp&disable=upscale",
	},
	{
		type: "like",
		userName: "houjyuu",
		time: "2024-01-26T00:09:26.535Z",
		userIcon:
			"https://i.pinimg.com/236x/7e/3b/b2/7e3bb2b4059cceb64279789d228e2da2.jpg",
		content:
			"https://static01.nyt.com/images/2021/04/30/multimedia/30xp-meme/29xp-meme-articleLarge-v3.jpg?quality=75&auto=webp&disable=upscale",
	},
	{
		type: "like",
		userName: "yuuji",
		time: "2024-01-26T00:09:26.535Z",
		userIcon:
			"https://i.pinimg.com/236x/7e/3b/b2/7e3bb2b4059cceb64279789d228e2da2.jpg",
		content:
			"https://static01.nyt.com/images/2021/04/30/multimedia/30xp-meme/29xp-meme-articleLarge-v3.jpg?quality=75&auto=webp&disable=upscale",
	},
	{
		type: "like",
		userName: "honda",
		time: "2024-01-26T00:09:26.535Z",
		userIcon:
			"https://i.pinimg.com/236x/7e/3b/b2/7e3bb2b4059cceb64279789d228e2da2.jpg",
		content:
			"https://static01.nyt.com/images/2021/04/30/multimedia/30xp-meme/29xp-meme-articleLarge-v3.jpg?quality=75&auto=webp&disable=upscale",
	},
	{
		type: "comment",
		userName: "kuge",
		time: "2024-01-25T15:09:26.535Z",
		userIcon:
			"https://images.pexels.com/photos/15006072/pexels-photo-15006072/free-photo-of-view-of-pic-du-midi-d-ossau-mountain-in-france.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
		content:
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROjfDTghEmMns99jBtOkpQrfBN19Xfw4W2Kg&usqp=CAU",
	},
	{
		type: "like",
		userName: "nakagawa",
		time: "2024-01-24T15:09:26.535Z",
		userIcon:
			"https://i.pinimg.com/236x/7e/3b/b2/7e3bb2b4059cceb64279789d228e2da2.jpg",
		content:
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa_GcOCyQpK1SeltMyp1dsD2c1LCU_OZcURw&usqp=CAU",
	},
	{
		type: "comment",
		userName: "yabaihito",
		time: "2024-01-23T15:09:26.535Z",
		userIcon:
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSjVW0SZOp8QdyTUb9FH0m5CoTLqfe7PyTSQ&usqp=CAU",
		content:
			"https://miro.medium.com/v2/resize:fit:1358/1*GI-td9gs8D5OKZd19mAOqA.png",
	},
	{
		type: "follow",
		userName: "wtfman",
		time: "2024-01-22T15:09:26.535Z",
		userIcon:
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO1_zJQOuyXfJyykzjaPv1I67xbKI3pJO0Mw&usqp=CAU",
		content:
			"https://static01.nyt.com/images/2021/04/30/multimedia/30xp-meme/29xp-meme-articleLarge-v3.jpg?quality=75&auto=webp&disable=upscale",
	},
	{
		type: "like",
		userName: "nanisore",
		time: "2024-01-21T15:09:26.535Z",
		userIcon:
			"https://ichef.bbci.co.uk/news/976/cpsprodpb/16620/production/_91408619_55df76d5-2245-41c1-8031-07a4da3f313f.jpg",
		content:
			"https://static01.nyt.com/images/2021/04/30/multimedia/30xp-meme/29xp-meme-articleLarge-v3.jpg?quality=75&auto=webp&disable=upscale",
	},
	{
		type: "comment",
		userName: "auhgowww",
		time: "2024-01-21T15:09:26.535Z",
		userIcon:
			"https://lh3.googleusercontent.com/l1PbMRIFRS4BcOXSyUjbSsi3OKJOdp6ysy0G5w2O-jNCHcRMnWRDXSWNee0MHifq9IMVqLxo23K3A0iMh8UutYMjOUpwyrsxnS-VpO7S=rp-w1080-nu",
		content:
			"https://static01.nyt.com/images/2021/04/30/multimedia/30xp-meme/29xp-meme-articleLarge-v3.jpg?quality=75&auto=webp&disable=upscale",
	},
	{
		type: "like",
		userName: "nanimonaiiii",
		time: "2024-01-20T15:09:26.535Z",
		userIcon:
			"https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/09/meme-che-15.jpg",
		content:
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSjVW0SZOp8QdyTUb9FH0m5CoTLqfe7PyTSQ&usqp=CAU",
	},
	{
		type: "comment",
		userName: "queksoa",
		time: "2024-01-19T15:09:26.535Z",
		userIcon:
			"https://lh3.googleusercontent.com/l1PbMRIFRS4BcOXSyUjbSsi3OKJOdp6ysy0G5w2O-jNCHcRMnWRDXSWNee0MHifq9IMVqLxo23K3A0iMh8UutYMjOUpwyrsxnS-VpO7S=rp-w1080-nu",
		content:
			"https://static01.nyt.com/images/2021/04/30/multimedia/30xp-meme/29xp-meme-articleLarge-v3.jpg?quality=75&auto=webp&disable=upscale",
	},
	{
		type: "like",
		userName: "huias",
		time: "2024-01-19T15:09:26.535Z",
		userIcon:
			"https://ichef.bbci.co.uk/news/976/cpsprodpb/16620/production/_91408619_55df76d5-2245-41c1-8031-07a4da3f313f.jpg",
		content:
			"https://static01.nyt.com/images/2021/04/30/multimedia/30xp-meme/29xp-meme-articleLarge-v3.jpg?quality=75&auto=webp&disable=upscale",
	},
	{
		type: "follow",
		userName: "loisg",
		time: "2024-01-17T15:09:26.535Z",
		userIcon:
			"https://i.pinimg.com/236x/7e/3b/b2/7e3bb2b4059cceb64279789d228e2da2.jpg",
		content:
			"https://static01.nyt.com/images/2021/04/30/multimedia/30xp-meme/29xp-meme-articleLarge-v3.jpg?quality=75&auto=webp&disable=upscale",
	},
	{
		type: "like",
		userName: "Aさん",
		time: "2024-01-17T15:09:26.535Z",
		userIcon:
			"https://static01.nyt.com/images/2021/04/30/multimedia/30xp-meme/29xp-meme-articleLarge-v3.jpg?quality=75&auto=webp&disable=upscale",
		content:
			"https://static01.nyt.com/images/2021/04/30/multimedia/30xp-meme/29xp-meme-articleLarge-v3.jpg?quality=75&auto=webp&disable=upscale",
	},
	{
		type: "comment",
		userName: "Aさん",
		time: "2024-01-15T15:09:26.535Z",
		userIcon:
			"https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/09/meme-che-15.jpg",
		content:
			"https://static01.nyt.com/images/2021/04/30/multimedia/30xp-meme/29xp-meme-articleLarge-v3.jpg?quality=75&auto=webp&disable=upscale",
	},
];
const notiTypeFormat = (type) => {
	switch (type) {
		case "like":
			return "がいいねしました。";
		case "comment":
			return "がコメントしました。";
		case "follow":
			return "がフォローしました。";
		default:
			return "";
	}
};
function Notification({ onClose }) {
	return (
		<div
			className="Notification"
			onClick={(e) => {
				if (e.target === e.currentTarget) {
					onClose();
				}
			}}
		>
			<div className="notiBox">
				<div className="notiTitle">
					<div className="notiTitleWr">
						<h2>通知</h2>
					</div>
				</div>
				<div className="notiContent">
					<div className="notiContentWr">
						{notiData.map((notification, index) => (
							<NotiBox
								key={index}
								type={notiTypeFormat(notification.type)}
								userName={notification.userName}
								time="2年前"
								userIcon={notification.userIcon}
								content={notification.content}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Notification;
