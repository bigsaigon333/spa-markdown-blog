import AbstractView from "./AbstractView";

export default class Loading extends AbstractView {
	constructor(props) {
		super(props);
		const { $parent } = props;

		const $loading = document.createElement("div");
		this.$loading = $loading;
		$loading.className = "loading-container";
		$loading.innerHTML = `     <h2>Loading</h2>
		<i class="spinner--rotate fas fa-spinner fa-9x"></i>
		`;

		$parent.appendChild($loading);
		this.setState({ visible: true });
	}

	render() {
		const { visible } = this.state;
		if (visible) {
			this.$loading.classList.remove("loading--hidden");
		} else {
			this.$loading.classList.add("loading--hidden");
		}
	}
}
