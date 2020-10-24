import Edit from "./views/Edit.js";
import Home from "./views/Home.js";
import New from "./views/New.js";
import Post from "./views/Post.js";
import Loading from "./views/Loading.js";
import Header from "./views/Header.js";

import "../css/styles.css";
import Footer from "./views/Footer.js";

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

export const navigateTo = (url) => {
	history.pushState(null, null, url);
	router();
};

const router = async () => {
	const routes = [
		{ path: "/", view: Home },
		{ path: "/portfolio", view: Home }, // TODO: portfolio 화면 만들기
		{ path: "/about-me", view: Home }, // TODO: about-me 화면 만들기
		{ path: "/new", view: New },
		{ path: "/:id", view: Post },
		{ path: "/:id/edit", view: Edit },
	];

	const potentialMatches = routes.map((route) => {
		// console.log(route.path, pathToRegex(route.path));
		return {
			route: route,
			result: location.pathname.match(pathToRegex(route.path)),
		};
	});

	let match = potentialMatches.find((route) => route.result !== null);

	if (!match) {
		match = {
			route: routes[0],
			result: [location.pathname],
		};
	}

	// console.log(match.route.path);
	// console.log(getParams(match).id);

	if (currView) currView.removeEventListener();

	const view = new match.route.view(getParams(match));
	currView = view;

	document.querySelector("#app").classList.toggle("app--blur");
	document.querySelector("#app").innerHTML += loadingHtml;

	document.querySelector("#app").innerHTML = await view.getHtml();
	document.querySelector("#app").classList.toggle("app--blur");
};

async function init() {
	console.log("domcontent loaded");

	document.querySelector("nav").innerHTML = headerHtml;
	await router();
	document.querySelector("#footer").replaceWith(Footer());

	function handleClickEvent(event) {
		// const path = event.path.slice(0, -2);
		const path = event.composedPath().slice(0, -2);
		// console.log(path);
		const anchor = path.find((elem) => elem.matches("[data-link]"));

		if (anchor) {
			event.preventDefault();
			// console.log(anchor.href);

			navigateTo(anchor.href);
		}
	}

	document.body.addEventListener("click", handleClickEvent);
	// document.body.addEventListener("touchstart", handleClickEvent);
}

window.addEventListener("DOMContentLoaded", init);
window.addEventListener("load", () => console.log("window loaded"));

window.addEventListener("popstate", router);
