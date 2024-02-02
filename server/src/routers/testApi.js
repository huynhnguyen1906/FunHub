const express = require("express");
const router = express.Router();

router.get("/api", (req, res) => {
	res.send("Hello from SERVER");
});

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
				id: "1",
				type: "image",
				url: "https://i.pinimg.com/736x/b9/c4/7e/b9c47ef70bff06613d397abfce02c6e7.jpg",
			},
			{
				id: "2",
				type: "image",
				url: "https://uploads.dailydot.com/2018/10/olli-the-polite-cat.jpg?q=65&auto=format&w=2270&ar=2:1&fit=crop",
			},
			{
				id: "3",
				type: "image",
				url: "https://uploads.dailydot.com/2018/10/olli-the-polite-cat.jpg?q=65&auto=format&w=2270&ar=2:1&fit=crop",
			},
			{
				id: "4",
				type: "image",
				url: "https://uploads.dailydot.com/2018/10/olli-the-polite-cat.jpg?q=65&auto=format&w=2270&ar=2:1&fit=crop",
			},
			{
				id: "5",
				type: "image",
				url: "https://uploads.dailydot.com/2018/10/olli-the-polite-cat.jpg?q=65&auto=format&w=2270&ar=2:1&fit=crop",
			},
			{
				id: "6",
				type: "image",
				url: "https://uploads.dailydot.com/2018/10/olli-the-polite-cat.jpg?q=65&auto=format&w=2270&ar=2:1&fit=crop",
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
				id: "7",
				type: "image",
				url: "https://imgflip.com/s/meme/Scared-Cat.jpg",
			},
			{
				id: "8",
				type: "image",
				url: "https://imgflip.com/s/meme/Scared-Cat.jpg",
			},
			{
				id: "9",
				type: "image",
				url: "https://i.pinimg.com/736x/b9/c4/7e/b9c47ef70bff06613d397abfce02c6e7.jpg",
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
				id: "1",
				type: "image",
				url: "https://i.pinimg.com/736x/b9/c4/7e/b9c47ef70bff06613d397abfce02c6e7.jpg",
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
			id: "10",
			name: "Huynh",
			avatar:
				"https://uploads.dailydot.com/2018/10/olli-the-polite-cat.jpg?q=65&auto=format&w=2270&ar=2:1&fit=crop",
		},
		content:
			"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
		media: [],
		likes: 10504,
		comments: 45,
		shares: 67,
		timestamp: "2022-01-01T00:00:00Z",
		location: "Location Name 1",
	},
];
router.get("/posts", (req, res) => {
	res.json(posts);
});
router.get("/posts/:id", (req, res) => {
	const id = req.params.id;
	const post = posts.find((post) => post.id === id);
	if (post) {
		res.json(post);
	} else {
		res.status(404).send("Post not found");
	}
});

module.exports = router;
