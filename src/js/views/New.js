import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
	constructor(params) {
		super(params);
		this.setTitle("New");
	}

	submitHandler(event) {
		event.preventDefault();

		const form = document.querySelector("#new-form");
		const FD = new FormData(form);
		const body = Object.fromEntries(FD.entries());

		fetch("http://localhost:3000/new.json", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body),
		})
			.then((res) => {
				if (!res.ok) {
					console.error(res);
					throw new Error("Network Error");
				}
				return res.json();
			})
			.then((data) => {
				console.log(data);
			})
			.catch((error) => {
				console.error(error);
			});
	}

	getHtml() {
		window.addEventListener("load", () => {
			document
				.querySelector("#new-form")
				.addEventListener("submit", this.submitHandler);
		});

		return `
        <form method="POST" id="new-form">

            <label for="new__title">Title</label>
            <input id="new__title" type="text" name="title" required>
            <textarea id="new__description" name="description" required></textarea>
            
            <input type="submit" value="제출">

        </form>

        `;
	}
}
