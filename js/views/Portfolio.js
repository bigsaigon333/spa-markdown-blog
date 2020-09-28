import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
	constructor(params) {
		super(params);
		this.setTitle("Portfolio");
	}

	getHtml() {
		return `<h1>Portfolio</h1>`;
	}
}
