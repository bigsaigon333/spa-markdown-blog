import { isLoggedIn } from "./api/loginApi";
import Edit from "./views/Edit";
import Header from "./views/Header";
import Home from "./views/Home";
import Login from "./views/Login";
import New from "./views/New";
import Post from "./views/Post";

let $oldView;
let loginStatus;

export function navigateTo(url) {
	history.pushState(null, null, url);
	router();
}

export default async function router() {
	const routes = [
		{ path: "/", view: Home },
		{ path: "/portfolio", view: Home }, // TODO: portfolio 화면 만들기
		{ path: "/about-me", view: Home }, // TODO: about-me 화면 만들기
		{ path: "/login", view: Login },
		{ path: "/new", view: New },

		// /:id should be always all the way down
		{ path: "/:id/edit", view: Edit },
		{ path: "/:id", view: Post },
	];

	const potentialMatches = routes.map((route) => {
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

	if (loginStatus !== isLoggedIn()) {
		loginStatus = isLoggedIn();

		const $nav = document.querySelector("nav");
		$nav.replaceWith(new Header().render());
	}

	const View = new match.route.view(getParams(match));
	const $app = document.querySelector("#app");

	// App.classList.toggle("app--blur");
	// App.innerHTML += loadingHtml;

	const $newView = await View.render();
	if ($oldView == null) $app.appendChild($newView);
	else $app.replaceChild($newView, $oldView);

	$oldView = $newView;
	// App.classList.toggle("app--blur");
}

function pathToRegex(path) {
	return new RegExp(
		"^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "([^/]+)") + "$"
	);
}

function getParams(match) {
	const values = match.result.slice(1);
	const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
		(result) => result[1]
	);

	return Object.fromEntries(
		keys.map((key, i) => {
			return [key, values[i]];
		})
	);
}
