const express = require("express")
const app = express()

app.get("/", (req, res) => {
	res.send("Hello from the backend!")
})

const port = 3001
app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`)
})
