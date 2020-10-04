import Edit from "./views/Edit.js";
import Home from "./views/Home.js";
import New from "./views/New.js";
import Post from "./views/Post.js";

// const BASE_URL = "/spa-markdown-blog";
const BASE_URL = "";

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

	const view = new match.route.view(getParams(match));

	// To Do: 로딩화면 만들기
	document.querySelector("#app").innerHTML = `<h3>...Loading...</h3>`;

	document.querySelector("#app").innerHTML = await view.getHtml();
};

async function init() {
	const params = getQueries();
	if (params["redirect_url"]) {
		window.history.replaceState(null, null, BASE_URL + params["redirect_url"]);
	}
	// console.log(location.pathname);

	router();

	document.body.addEventListener("click", (event) => {
		const path = event.path;
		path.pop();
		path.pop();
		const anchor = path.find((elem) => elem.matches("[data-link]"));

		if (anchor) {
			// console.log(anchor);
			event.preventDefault();
			navigateTo(anchor.origin + BASE_URL + anchor.pathname);
		}
	});
}

window.addEventListener("DOMContentLoaded", init);

window.addEventListener("popstate", router);
