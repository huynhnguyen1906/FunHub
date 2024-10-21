require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const apiRoutes = require("./src/routers/web");
const path = require("path");
const checkOrigin = require("./middlewares/checkOrigin"); // Import middleware

const app = express();
const port = process.env.PORT || 8081;
const hostname = process.env.HOST_NAME;

app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

app.use("/", checkOrigin, apiRoutes);

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.listen(port, hostname, () => {
	console.log(`App running on http://${hostname}:${port}/`);
});
