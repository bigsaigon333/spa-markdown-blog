const express = require("express");
const path = require("path");

const server = express();

server.use(express.static(path.resolve(__dirname, "src")));

server.use("/", (req, res, next) => {
	res.sendFile(path.resolve(__dirname, "src", "index.html"));
});

server.listen(3000, () => console.log("Server is listening"));
