import Blog from "./views/Blog.js";
import Home from "./views/Home.js";
import Portfolio from "./views/Portfolio.js";

const BASE_URL = "/spa-markdown-blog";
// const BASE_URL = "";

const getParams = () => {
	const re = new RegExp(/([^\=?&]+)\=([^\&]+)/g);

	const tmp = [];
	for (let match of location.search.matchAll(re)) {
		const [, key, value] = match;
		tmp.push([key, value]);
	}

	return Object.fromEntries(tmp);
};

const navigateTo = (url) => {
	history.pushState(null, null, url);
	router();
};

const router = () => {
	const routes = [
		{ path: "/", view: Home },
		{ path: "/portfolio", view: Portfolio },
		{ path: "/blog", view: Blog },
	];

	const potentialMatches = routes.map((potentialMatch) => {
		return {
			route: potentialMatch,
			isMatch: location.pathname === BASE_URL + potentialMatch.path,
		};
	});

	let match = potentialMatches.find((route) => route.isMatch);

	if (!match) {
		match = {
			route: routes[0],
			isMatch: true,
		};
	}

	const view = new match.route.view();
	document.querySelector("#app").innerHTML = view.getHtml();
};

function init() {
	const params = getParams();
	if (params["redirect_url"]) {
		window.history.replaceState(null, null, params["redirect_url"]);
	}

	router();
	document.body.addEventListener("click", (event) => {
		const path = event.path;
		path.pop();
		path.pop();
		const anchor = path.find((elem) => elem.matches("[data-link]"));

		if (anchor) {
			event.preventDefault();
			navigateTo(anchor.origin + BASE_URL + anchor.pathname);
		}
	});
}

document.addEventListener("DOMContentLoaded", init);

window.addEventListener("popstate", router);
