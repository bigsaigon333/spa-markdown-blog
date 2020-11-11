import "../css/styles.css";
import Router from "./router.js";

window.addEventListener("DOMContentLoaded", init);

function init() {
	const App = new Router();

	document.body.addEventListener("click", handleClickEvent);

	function handleClickEvent(event) {
		const path = event.composedPath().slice(0, -2);
		const anchor = path.find((elem) => elem.matches("[data-link]"));

		if (anchor) {
			event.preventDefault();
			App.navigateTo(anchor.href);
		}
	}
	window.addEventListener("popstate", () => App.navigateTo(location.pathname));
}
