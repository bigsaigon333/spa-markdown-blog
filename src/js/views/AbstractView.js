export default class {
	constructor(props) {
		this.props = props;
		this.state = {};
	}

	setState(state) {
		this.state = { ...this.state, ...state };
		// console.log("this: ", this, " state: ", this.state);
		this.render();
	}

	render() {}

	setTitle(title) {
		document.title = title;
	}
}
