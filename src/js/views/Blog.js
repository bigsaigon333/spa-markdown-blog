import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
	constructor(params) {
		super(params);
		this.setTitle("Blog");
	}

	getHtml() {
		return `<h1>Blog</h1>`;
	}
}
