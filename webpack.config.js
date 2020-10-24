const path = require("path");
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
					use: [MiniCssExtractPlugin.loader, "css-loader"],
				},
			],
		},
		plugins: [
			new MiniCssExtractPlugin(),
			new Dotenv({
				systemvars: true,
				path: "./.env",
			}),
		],
	};
};
