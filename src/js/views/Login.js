import { login } from "../api/loginApi";
import { navigateTo } from "../router";
import AbstractView from "./AbstractView";
import Header from "./Header";

export default class extends AbstractView {
	constructor(props) {
		super(props);
	}

	async handleLogin(event) {
		event.preventDefault();
		console.log("handleLogin!!");

		const username = document.querySelector("#login-form #username").value;
		const password = document.querySelector("#login-form #password").value;

		try {
			const result = await login({ username, password });

			if (result) {
				document.querySelector("nav").replaceWith(new Header().render());

				navigateTo("/");
			}
		} catch (error) {
			console.error(error);
		}
	}

	render() {
		const $loginForm = document.createElement("form");
		$loginForm.id = "login-form";
		$loginForm.addEventListener("submit", this.handleLogin);
		$loginForm.innerHTML = `<input type="text" id="username" placeholder="Username" />
		<input type="password" id="password" placeholder="Password" />
		<button>login</button>`;

		return $loginForm;
	}
}
