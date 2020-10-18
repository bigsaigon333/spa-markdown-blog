import AbstractView from "./AbstractView";

export default class Loading extends AbstractView {
	constructor(props) {
		super(props);
	}

	getHtml() {
		return `
        <div class="loading-container">
            <h2>Loading</h2>
            <i class="spinner--rotate fas fa-spinner fa-9x"></i>
        </div>
        `;
	}
}
