import Header from "./views/Header.js";
import Footer from "./views/Footer.js";

import "../css/styles.css";
import router, { navigateTo } from "./router.js";

window.addEventListener("DOMContentLoaded", init);
window.addEventListener("popstate", router);

async function init() {
	const $nav = document.querySelector("nav");
	const $footer = document.querySelector("#footer");
	const $body = document.body;

	$nav.replaceWith(new Header().render());
	await router();
	$footer.replaceWith(new Footer().render());

	$body.addEventListener("click", handleClickEvent);

	function handleClickEvent(event) {
		const path = event.composedPath().slice(0, -2);
		const anchor = path.find((elem) => elem.matches("[data-link]"));

		if (anchor) {
			event.preventDefault();
			navigateTo(anchor.href);
		}
	}
}
