require("dotenv").config();
const express = require("express"); //commonjs
const cookieParser = require("cookie-parser");
const apiRoutes = require("./src/routers/web");
const path = require("path");
const app = express(); // app express
const port = process.env.PORT || 8081; // port => hardcode
const hostname = process.env.HOST_NAME;

app.use(express.json());
app.use(cookieParser());
app.use("/", apiRoutes);
app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.listen(port, hostname, () => {
	console.log(`App running on http://${hostname}:${port}/`);
});
