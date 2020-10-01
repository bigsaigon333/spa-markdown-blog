const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const morgan = require("morgan");
const Blog = require("./Blog.js");

const server = express();
mongoose.connect("mongodb://localhost:27017/smb", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("mongoose connection is established"));

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(express.static(path.resolve(__dirname, "src")));
server.use(morgan("dev"));

server.post("/new.json", async (req, res) => {
	if (req.body === {}) {
		res.status(400).json({ error: "There is no content in request body" });
		return;
	}

	try {
		const { title, description } = req.body;
		const newBlog = new Blog({ title, description });
		await newBlog.save();
		res.status(200).json({ success: "success!!" });
	} catch (error) {
		res.status(400).json(error);
	}
});

server.get("/blog_list.json", async (req, res) => {
	try {
		const Blogs = await Blog.find({}).sort({ createdAt: "desc" });
		res.status(200).json(Blogs);
	} catch (error) {
		res.status(400).json({ error: "Something goes wrong" + error });
	}
});

server.use((req, res) => {
	res.status(404).sendFile(path.resolve(__dirname, "src", "404.html"));
});

server.listen(3000, () => console.log("Server is listening"));
