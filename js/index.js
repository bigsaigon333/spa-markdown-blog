import Blog from "./views/Blog.js";
import Home from "./views/Home.js";
import Portfolio from "./views/Portfolio.js";

const navigateTo = (uri) => {
	history.pushState(null, null, uri);
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
			isMatch: location.pathname === potentialMatch.path,
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
	router();
	document.body.addEventListener("click", (event) => {
		const path = event.path;
		path.pop();
		path.pop();
		const anchor = path.find((elem) => elem.matches("[data-link]"));

		if (anchor) {
			event.preventDefault();
			navigateTo(anchor.href);
		}
	});
}

document.addEventListener("DOMContentLoaded", init);

window.addEventListener("popstate", router);
