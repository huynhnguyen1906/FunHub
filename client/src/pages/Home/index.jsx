import "./Home.scss";
import CratePostBar from "~/component/CreatePost/CreatePostBar/CreatePostBar";
import PostItem from "~/component/PostItem/PostItem";

const posts = [
	{
		id: "1",
		user: {
			id: "1",
			name: "Da",
			avatar: "https://imgflip.com/s/meme/Scared-Cat.jpg",
		},
		content:
			"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
		media: [
			{
				type: "image",
				url: "https://uploads.dailydot.com/2018/10/olli-the-polite-cat.jpg?q=65&auto=format&w=2270&ar=2:1&fit=crop",
			},
			{
				type: "image",
				url: "https://uploads.dailydot.com/2018/10/olli-the-polite-cat.jpg?q=65&auto=format&w=2270&ar=2:1&fit=crop",
			},
			{
				type: "image",
				url: "https://uploads.dailydot.com/2018/10/olli-the-polite-cat.jpg?q=65&auto=format&w=2270&ar=2:1&fit=crop",
			},
			{
				type: "image",
				url: "https://www.the-sun.com/wp-content/uploads/sites/6/2023/10/www-instagram-com-monkeycatluna-hl-851711797.jpg",
			},
			{
				type: "image",
				url: "https://www.the-sun.com/wp-content/uploads/sites/6/2023/10/www-instagram-com-monkeycatluna-hl-851711797.jpg",
			},
			{
				type: "image",
				url: "https://www.the-sun.com/wp-content/uploads/sites/6/2023/10/www-instagram-com-monkeycatluna-hl-851711797.jpg",
			},
		],
		likes: 1524,
		comments: 45002,
		shares: 67,
		timestamp: "2022-01-01T00:00:00Z",
		location: "Location Name 1",
	},
	{
		id: "2",
		user: {
			id: "1",
			name: "Da",
			avatar: "https://imgflip.com/s/meme/Scared-Cat.jpg",
		},
		content:
			"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
		media: [
			{
				type: "image",
				url: "https://imgflip.com/s/meme/Scared-Cat.jpg",
			},
			{
				type: "image",
				url: "https://imgflip.com/s/meme/Scared-Cat.jpg",
			},
			{
				type: "video",
				url: "https://scontent.cdninstagram.com/v/t2/f1/m69/GICWmACHd-HJZEUBANp2OpO6zRgcbmdjAAAF.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6Im9lcF9oZCJ9&_nc_ht=scontent-sof1-1.xx.fbcdn.net&_nc_cat=101&strext=1&vs=c0a2b66fe0c97cb6&_nc_vs=HBksFQIYOnBhc3N0aHJvdWdoX2V2ZXJzdG9yZS9HSUNXbUFDSGQtSEpaRVVCQU5wMk9wTzZ6UmdjYm1kakFBQUYVAALIAQAVAhg6cGFzc3Rocm91Z2hfZXZlcnN0b3JlL0dJQ1dtQUNTTGNzUUhBb0JBTUpKcGlfLVJxVmVidjRHQUFBRhUCAsgBAEsHiBJwcm9ncmVzc2l2ZV9yZWNpcGUBMQ1zdWJzYW1wbGVfZnBzABB2bWFmX2VuYWJsZV9uc3ViACBtZWFzdXJlX29yaWdpbmFsX3Jlc29sdXRpb25fc3NpbQAoY29tcHV0ZV9zc2ltX29ubHlfYXRfb3JpZ2luYWxfcmVzb2x1dGlvbgAddXNlX2xhbmN6b3NfZm9yX3ZxbV91cHNjYWxpbmcAEWRpc2FibGVfcG9zdF9wdnFzABUAJQAcjBdAAAAAAAAAABERAAAAJuzHmY%2FxlpcFFQIoAkMzGAt2dHNfcHJldmlldxwXQJVoT987ZFoYIWRhc2hfZ2VuMmh3YmFzaWNfaHEyX2ZyYWdfMl92aWRlbxIAGBh2aWRlb3MudnRzLmNhbGxiYWNrLnByb2Q4ElZJREVPX1ZJRVdfUkVRVUVTVBsKiBVvZW1fdGFyZ2V0X2VuY29kZV90YWcGb2VwX2hkE29lbV9yZXF1ZXN0X3RpbWVfbXMBMAxvZW1fY2ZnX3J1bGUHdW5tdXRlZBNvZW1fcm9pX3JlYWNoX2NvdW50ATARb2VtX2lzX2V4cGVyaW1lbnQADG9lbV92aWRlb19pZA8yODk1NzA2NzA0NDI2MDcSb2VtX3ZpZGVvX2Fzc2V0X2lkEDM2MDQ5MzI0MTMxNTYwMzgVb2VtX3ZpZGVvX3Jlc291cmNlX2lkEDE0NTgzNDU1NTgwOTQzMjYcb2VtX3NvdXJjZV92aWRlb19lbmNvZGluZ19pZBAxMzI4MzA2NTIxMjEzMDM3DnZ0c19yZXF1ZXN0X2lkACUCHAAlxAEbB4gBcwQ4MDgzAmNkCjIwMjQtMDEtMjcDcmNiATADYXBwBVZpZGVvAmN0GUNPTlRBSU5FRF9QT1NUX0FUVEFDSE1FTlQTb3JpZ2luYWxfZHVyYXRpb25fcwcxMzcxLjg2AnRzFXByb2dyZXNzaXZlX2VuY29kaW5ncwA%3D&ccb=9-4&oh=00_AfDg8DPqNZfECQ_TOvWijexEXmyq9v-wD4Hm0APvh1gAJg&oe=65B6A2CD&_nc_sid=1d576d&_nc_rid=769788810189679&_nc_store_type=1",
			},
		],
		likes: 10504,
		comments: 45,
		shares: 67,
		timestamp: "2022-01-01T00:00:00Z",
		location: "Location Name 1",
	},
	{
		id: "3",
		user: {
			id: "2",
			name: "Huynh",
			avatar:
				"https://uploads.dailydot.com/2018/10/olli-the-polite-cat.jpg?q=65&auto=format&w=2270&ar=2:1&fit=crop",
		},
		content:
			"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
		media: [
			{
				type: "video",
				url: "https://scontent.cdninstagram.com/v/t2/f1/m69/GICWmACHd-HJZEUBANp2OpO6zRgcbmdjAAAF.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6Im9lcF9oZCJ9&_nc_ht=scontent-sof1-1.xx.fbcdn.net&_nc_cat=101&strext=1&vs=c0a2b66fe0c97cb6&_nc_vs=HBksFQIYOnBhc3N0aHJvdWdoX2V2ZXJzdG9yZS9HSUNXbUFDSGQtSEpaRVVCQU5wMk9wTzZ6UmdjYm1kakFBQUYVAALIAQAVAhg6cGFzc3Rocm91Z2hfZXZlcnN0b3JlL0dJQ1dtQUNTTGNzUUhBb0JBTUpKcGlfLVJxVmVidjRHQUFBRhUCAsgBAEsHiBJwcm9ncmVzc2l2ZV9yZWNpcGUBMQ1zdWJzYW1wbGVfZnBzABB2bWFmX2VuYWJsZV9uc3ViACBtZWFzdXJlX29yaWdpbmFsX3Jlc29sdXRpb25fc3NpbQAoY29tcHV0ZV9zc2ltX29ubHlfYXRfb3JpZ2luYWxfcmVzb2x1dGlvbgAddXNlX2xhbmN6b3NfZm9yX3ZxbV91cHNjYWxpbmcAEWRpc2FibGVfcG9zdF9wdnFzABUAJQAcjBdAAAAAAAAAABERAAAAJuzHmY%2FxlpcFFQIoAkMzGAt2dHNfcHJldmlldxwXQJVoT987ZFoYIWRhc2hfZ2VuMmh3YmFzaWNfaHEyX2ZyYWdfMl92aWRlbxIAGBh2aWRlb3MudnRzLmNhbGxiYWNrLnByb2Q4ElZJREVPX1ZJRVdfUkVRVUVTVBsKiBVvZW1fdGFyZ2V0X2VuY29kZV90YWcGb2VwX2hkE29lbV9yZXF1ZXN0X3RpbWVfbXMBMAxvZW1fY2ZnX3J1bGUHdW5tdXRlZBNvZW1fcm9pX3JlYWNoX2NvdW50ATARb2VtX2lzX2V4cGVyaW1lbnQADG9lbV92aWRlb19pZA8yODk1NzA2NzA0NDI2MDcSb2VtX3ZpZGVvX2Fzc2V0X2lkEDM2MDQ5MzI0MTMxNTYwMzgVb2VtX3ZpZGVvX3Jlc291cmNlX2lkEDE0NTgzNDU1NTgwOTQzMjYcb2VtX3NvdXJjZV92aWRlb19lbmNvZGluZ19pZBAxMzI4MzA2NTIxMjEzMDM3DnZ0c19yZXF1ZXN0X2lkACUCHAAlxAEbB4gBcwQ4MDgzAmNkCjIwMjQtMDEtMjcDcmNiATADYXBwBVZpZGVvAmN0GUNPTlRBSU5FRF9QT1NUX0FUVEFDSE1FTlQTb3JpZ2luYWxfZHVyYXRpb25fcwcxMzcxLjg2AnRzFXByb2dyZXNzaXZlX2VuY29kaW5ncwA%3D&ccb=9-4&oh=00_AfDg8DPqNZfECQ_TOvWijexEXmyq9v-wD4Hm0APvh1gAJg&oe=65B6A2CD&_nc_sid=1d576d&_nc_rid=769788810189679&_nc_store_type=1",
			},
		],
		likes: 10504,
		comments: 45,
		shares: 67,
		timestamp: "2022-01-01T00:00:00Z",
		location: "Location Name 1",
	},
];

function Home() {
	return (
		<div className="homeContent">
			<div className="crateBox">
				<CratePostBar />
			</div>
			<div className="postContent">
				{posts.map((post, id) => (
					<PostItem key={id} post={post} />
				))}
			</div>
		</div>
	);
}

export default Home;
