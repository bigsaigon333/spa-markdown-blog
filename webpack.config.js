const path = require("path");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");

module.exports = () => {
	return {
		entry: "./src/js/index.js",
		output: {
			path: path.resolve(__dirname, "build"),
			filename: "index.js",
		},
		module: {
			rules: [
				{ test: /\.css$/i, use: ["style-loader", "css-loader"] },
				{ test: /\.html$/i, loader: "html-loader" },
			],
		},
		plugins: [
			new Dotenv({
				systemvars: true,
			}),
		],
	};
};
