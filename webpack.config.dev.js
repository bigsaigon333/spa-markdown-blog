const path = require("path");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = () => {
	return {
		entry: "./src/js/index.js",
		output: {
			path: path.resolve(__dirname, "build"),
			filename: "index.js",
		},
		module: {
			rules: [
				{
					test: /\.css$/i,
					use: ["style-loader", "css-loader"],
				},
			],
		},
		plugins: [
			new Dotenv({
				systemvars: true,
				path: "./.env.dev",
			}),
		],
	};
};
