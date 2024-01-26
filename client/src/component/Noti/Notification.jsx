import "./Notification.scss";
import NotiBox from "./NotiCnt/NotiCnt";

const notiData = [
	{
		type: "like",
		userName: "Aさん",
		time: "2024-01-26T00:09:26.535Z",
	},
	{
		type: "comment",
		userName: "Aさん",
		time: "2024-01-25T15:09:26.535Z",
	},
	{
		type: "like",
		userName: "Aさん",
		time: "2024-01-24T15:09:26.535Z",
	},
	{
		type: "comment",
		userName: "Aさん",
		time: "2024-01-23T15:09:26.535Z",
	},
	{
		type: "follow",
		userName: "Aさん",
		time: "2024-01-22T15:09:26.535Z",
	},
	{
		type: "like",
		userName: "Aさん",
		time: "2024-01-21T15:09:26.535Z",
	},
	{
		type: "like",
		userName: "Aさん",
		time: "2024-01-21T15:09:26.535Z",
	},
	{
		type: "like",
		userName: "Aさん",
		time: "2024-01-20T15:09:26.535Z",
	},
	{
		type: "like",
		userName: "Aさん",
		time: "2024-01-19T15:09:26.535Z",
	},
	{
		type: "like",
		userName: "Aさん",
		time: "2024-01-19T15:09:26.535Z",
	},
	{
		type: "like",
		userName: "Aさん",
		time: "2024-01-17T15:09:26.535Z",
	},
	{
		type: "like",
		userName: "Aさん",
		time: "2024-01-17T15:09:26.535Z",
	},
	{
		type: "like",
		userName: "Aさん",
		time: "2024-01-15T15:09:26.535Z",
	},
	{
		type: "like",
		userName: "Aさん",
		time: "2024-01-14T15:09:26.535Z",
	},
	{
		type: "like",
		userName: "Aさん",
		time: "2024-01-11T15:09:26.535Z",
	},
	{
		type: "like",
		userName: "Aさん",
		time: "2024-01-11T15:09:26.535Z",
	},
	{
		type: "like",
		userName: "Aさん",
		time: "2024-01-8T15:09:26.535Z",
	},
	{
		type: "like",
		userName: "Aさん",
		time: "2023-12-21T15:09:26.535Z",
	},
	{
		type: "like",
		userName: "Aさん",
		time: "2023-12-21T15:09:26.535Z",
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
const notiTimeFormat = (time) => {
	const notiTime = new Date(time);
	const now = new Date();
	const nowUTC = new Date(now.toUTCString());
	const diff = nowUTC - notiTime;
	const diffMin = Math.floor(diff / 60000);
	const diffHour = Math.floor(diffMin / 60);
	const diffDay = Math.floor(diffHour / 24);
	const diffMonth = Math.floor(diffDay / 30);
	const diffYear = Math.floor(diffMonth / 12);
	if (diffYear > 0) {
		return `${diffYear}年前`;
	} else if (diffMonth > 0) {
		return `${diffMonth}ヶ月前`;
	} else if (diffDay > 0) {
		return `${diffDay}日前`;
	} else if (diffHour > 0) {
		return `${diffHour}時間前`;
	} else if (diffMin > 0) {
		return `${diffMin}分前`;
	} else {
		return `たった今`;
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
								time={notiTimeFormat(notification.time)}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Notification;
