import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
	constructor(params) {
		super(params);
		this.setTitle("Home");
	}

	getHtml() {
		return `<h1>Home</h1>`;
	}
}
