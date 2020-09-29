const express = require("express");
const path = require("path");

const server = express();

server.use(express.static(path.resolve(__dirname, "src")));

server.get("/", (req, res, next) => {
	res.sendFile(path.resolve(__dirname, "src", "index.html"));
});

server.use((req, res) => {
	res.status(404).sendFile(path.resolve(__dirname, "src", "404.html"));
});

server.listen(3000, () => console.log("Server is listening"));
