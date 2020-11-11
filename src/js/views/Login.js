import { login } from "../api/loginApi";
import AbstractView from "./AbstractView";

export default class extends AbstractView {
	constructor(props) {
		super(props);
		this.setTitle("Login");
		const { $parent } = this.props;

		const $loginForm = document.createElement("form");
		this.$loginForm = $loginForm;
		$parent.appendChild($loginForm);

		$loginForm.id = "login-form";
		$loginForm.addEventListener("submit", (e) => this.handleLogin(e));
		$loginForm.innerHTML = `<input type="text" id="username" placeholder="Username" />
		<input type="password" id="password" placeholder="Password" />
		<button>login</button>`;
	}

	async handleLogin(event) {
		event.preventDefault();

		const username = document.querySelector("#login-form #username").value;
		const password = document.querySelector("#login-form #password").value;

		try {
			const result = await login({ username, password });

			if (result) {
				this.props.handleLoginStatus(true);
				this.props.navigateTo("/");
			}
		} catch (error) {
			console.error(error);
		}
	}

	render() {}
}
