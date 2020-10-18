export default class {
	constructor(props) {
		this.props = props;
	}

	setTitle(title) {
		document.title = title;
	}

	addEventListener(handlers) {
		this.handlers = handlers;

		Object.keys(handlers).forEach((key) => {
			document.addEventListener(key, handlers[key]);
		});
	}

	removeEventListener() {
		if (!this.handlers) return;

		Object.keys(this.handlers).forEach((key) => {
			document.removeEventListener(key, this.handlers[key]);
		});
	}
}
