import Edit from "./views/Edit.js";
import Home from "./views/Home.js";
import New from "./views/New.js";
import Post from "./views/Post.js";
import Loading from "./views/Loading.js";
import Header from "./views/Header.js";

import "../css/styles.css";

// const BASE_URL = "/spa-markdown-blog";
const BASE_URL = "";

let currView = "";
const loadingHtml = new Loading().getHtml();
const headerHtml = new Header().getHtml();

const pathToRegex = (path) =>
	new RegExp(
		"^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "([^/]+)") + "$"
	);

const getParams = (match) => {
	const values = match.result.slice(1);
	const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
		(result) => result[1]
	);

	return Object.fromEntries(
		keys.map((key, i) => {
			return [key, values[i]];
		})
	);
};

const getQueries = () => {
	const re = new RegExp(/([^\=?&]+)\=([^\&]+)/g);

	const tmp = [];
	for (let match of location.search.matchAll(re)) {
		const [, key, value] = match;
		tmp.push([key, value]);
	}

	return Object.fromEntries(tmp);
};

export const navigateTo = (url) => {
	history.pushState(null, null, url);
	router();
};

const router = async () => {
	const routes = [
		{ path: "/", view: Home },
		// { path: "/portfolio", view: Portfolio },
		// { path: "/blog", view: Blog },
		{ path: "/new", view: New },
		{ path: "/:id", view: Post },
		{ path: "/:id/edit", view: Edit },
	];

	const potentialMatches = routes.map((route) => {
		return {
			route: route,
			result: location.pathname.match(pathToRegex(BASE_URL + route.path)),
		};
	});

	let match = potentialMatches.find((route) => route.result !== null);

	if (!match) {
		match = {
			route: routes[0],
			result: [location.pathname],
		};
	}

	// console.log(match);
	// console.log(getParams(match));

	if (currView) currView.removeEventListener();

	const view = new match.route.view(getParams(match));
	currView = view;

	document.querySelector("#app").classList.toggle("app--blur");
	document.querySelector("#app").innerHTML += loadingHtml;

	document.querySelector("#app").innerHTML = headerHtml;
	document.querySelector("#app").innerHTML += await view.getHtml();
	document.querySelector("#app").classList.toggle("app--blur");
};

async function init() {
	router();

	document.body.addEventListener("click", (event) => {
		const path = event.path.slice(0, -2);
		const anchor = path.find((elem) => elem.matches("[data-link]"));

		if (anchor) {
			event.preventDefault();
			console.log(anchor.href);
			// console.log(anchor.origin + anchor.pathname);
			// navigateTo(anchor.origin + BASE_URL + anchor.pathname);
			navigateTo(anchor.href);
		}
	});
}

window.addEventListener("DOMContentLoaded", init);

window.addEventListener("popstate", router);
