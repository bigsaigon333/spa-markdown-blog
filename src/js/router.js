import { isLoggedIn } from "./api/loginApi";
import Edit from "./views/Edit";
import Header from "./views/Header";
import Home from "./views/Home";
import Login from "./views/Login";
import New from "./views/New";
import Post from "./views/Post";
import Loading from "./views/Loading";
import Footer from "./views/Footer";
import AbstractView from "./views/AbstractView";
import Portfolio from "./views/Portfolio";

export default class Router extends AbstractView {
	constructor(props) {
		super(props);

		const loginStatus = isLoggedIn();

		const $app = document.querySelector("#app");
		this.$app = $app;

		// loading
		const loading = new Loading({ $parent: $app });
		this.loading = loading;

		//nav
		const header = new Header({
			$parent: $app,
			isLoggedIn: loginStatus,
			handleLoginStatus: (isLoggedIn) => {
				this.header.setState({ isLoggedIn: isLoggedIn });
				this.setState({ isLoggedIn: isLoggedIn });
			},

			navigateTo: (url) => this.navigateTo(url),
		});
		this.header = header;

		// main
		const $main = document.createElement("main");
		this.$main = $main;
		$app.appendChild($main);

		//footer
		const footer = new Footer({ $parent: $app });
		this.footer = footer;

		const match = this.getMatchedRoute(location.pathname);
		const params = this.getParams(match);

		this.setState({ ...match.route, params, isLoggedIn: loginStatus });
		// this.render();
	}

	getMatchedRoute(url) {
		const routes = [
			{ path: "/", view: Home },
			{ path: "/portfolio", view: Portfolio },
			// { path: "/about-me", view: Home }, // TODO: about-me 화면 만들기
			{ path: "/login", view: Login },
			{ path: "/new", view: New },

			// /:id should be always all the way down
			{ path: "/:id/edit", view: Edit },
			{ path: "/:id", view: Post },
		];

		const potentialMatches = routes.map((route) => {
			return {
				route: route,
				result: location.pathname.match(this.pathToRegex(route.path)),
			};
		});

		let match = potentialMatches.find((route) => route.result !== null);

		if (!match) {
			match = {
				route: routes[0],
				result: [location.pathname],
			};
		}

		return match;
	}

	navigateTo(url) {
		history.pushState(null, null, url);

		const match = this.getMatchedRoute(url);
		const params = this.getParams(match);

		this.setState({ ...match.route, params });
	}

	pathToRegex(path) {
		return new RegExp(
			"^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "([^/]+)") + "$"
		);
	}

	getParams(match) {
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

	render() {
		const { path, view, params, isLoggedIn } = this.state;
		this.$main.childNodes.forEach((child) => child.remove());

		if ((path === "/new" || path === "/:id/edit") && !isLoggedIn) {
			this.navigateTo("/");
			return;
		} else if (path === "/login") {
			if (isLoggedIn) {
				this.navigateTo("/");
				return;
			} else {
				new view({
					$parent: this.$main,
					...params,
					isLoggedIn,
					handleLoginStatus: (isLoggedIn) => {
						this.header.setState({ isLoggedIn: isLoggedIn });
						this.setState({ isLoggedIn: isLoggedIn });
					},
					navigateTo: (url) => this.navigateTo(url),
					handleLoadingStatus: (isVisible) =>
						this.loading.setState({ visible: isVisible }),
				});
			}
		} else {
			new view({
				$parent: this.$main,
				...params,
				isLoggedIn,
				navigateTo: (url) => this.navigateTo(url),
				handleLoadingStatus: (isVisible) =>
					this.loading.setState({ visible: isVisible }),
			});
		}
	}
}
