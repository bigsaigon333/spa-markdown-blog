import router from "./router.js";

let body;

function init() {
	document.body.addEventListener("click", (event) => {
		const path = event.path;
		path.pop();
		path.pop();
		console.log(path);

		const anchor = path.find((elem) => elem.matches("[data-link]"));

		if (anchor) {
			console.log(anchor);
			event.preventDefault();

			const uri = anchor.href;
			console.log("uri:", uri);
		}
	});
}

document.addEventListener("DOMContentLoaded", init);
