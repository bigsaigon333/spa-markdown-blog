import AbstractView from "./AbstractView.js";
import { navigateTo } from "../index.js";

export default class extends AbstractView {
	constructor(params) {
		super(params);
		this.setTitle("New");

		document.addEventListener("submit", this.submitHandler);
	}

	submitHandler(event) {
		if (event.target && event.target.className == "new-form") {
			event.preventDefault();
			// console.log(event.target);
			if (!confirm("제출하시겠습니까?")) return;

			const form = document.querySelector(".new-form");
			const FD = new FormData(form);
			const body = Object.fromEntries(FD.entries());
			console.log(body);

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
					navigateTo(location.origin);

					// document.removeEventListener("submit", this.submitHandler);
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}

	getHtml() {
		return `
        <form method="POST" class="new-form" >
            <div class="new-form__row">
                <label class="new__title-label new--font-large" for="new__title">Title</label>
                <input id="new__title" class="new__title new--font-large" type="text" name="title" required autofocus>
            </div>
            <div class="new-form__row">
                <label class="new__desc-label new--font-large" for="new__description">Description</label>
                <textarea id="new__description" class="new__description new--font-normal " name="description" rows="20" required></textarea>
            </div>
            
            <input class="new__submit-btn new--font-large" type="submit" value="제출">
        </form>

        `;
	}
}
