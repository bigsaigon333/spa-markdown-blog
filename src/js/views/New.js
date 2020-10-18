import AbstractView from "./AbstractView.js";
import { navigateTo } from "../index.js";
// import "../css/new.css";

export default class extends AbstractView {
	constructor(props) {
		super(props);
		this.setTitle("New");
		this.submitHandler = this.submitHandler.bind(this);

		this.addEventListener({
			submit: this.submitHandler,
		});

		// document.addEventListener("submit", this.submitHandler);
	}

	submitHandler(event) {
		if (event.target && event.target.className == "new-form") {
			event.preventDefault();
			// console.log(event.target);
			if (!confirm("제출하시겠습니까?")) return;

			// const converter = new showdown.Converter();

			const form = document.querySelector(".new-form");
			// const description = form.querySelector(".new__description");
			// const text = description.value;
			// const html = converter.makeHtml(text);
			// description.value = html;

			// console.log(html);

			const FD = new FormData(form);
			const body = Object.fromEntries(FD.entries());
			console.log(body);

			fetch(process.env.API_URL, {
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

					document.removeEventListener("submit", this.submitHandler);
					navigateTo(location.origin);
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
