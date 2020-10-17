const path = require("path");
const webpack = require("webpack");
// const dotenv = require("dotenv");
const Dotenv = require("dotenv-webpack");

module.exports = () => {
	// const env = dotenv.config().parsed;
	// // console.log(env);

	// const envKeys = Object.keys(env).reduce((acc, curr) => {
	// 	acc[`process.env.${curr}`] = JSON.stringify(env[curr]);
	// 	return acc;
	// }, {});
	// console.log(envKeys);

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
		// plugins: [new webpack.DefinePlugin(envKeys)],
		plugins: [new Dotenv()],
	};
};
