import AbstractView from "./AbstractView.js";
import { navigateTo } from "../index.js";

export default class Edit extends AbstractView {
	constructor(props) {
		super(props);
		this.setTitle("Edit");

		this.addEventListener({ submit: this.submitHandler.bind(this) });
	}

	submitHandler(event) {
		// console.log(event.target.className);
		if (event.target.className == "new-form") {
			event.preventDefault();
			// console.log(event.target);
			if (!confirm("수정하시겠습니까?")) return;

			const form = document.querySelector(".new-form");
			const FD = new FormData(form);
			const body = Object.fromEntries(FD.entries());
			// console.log(body);

			const id = event.target.dataset.id;
			console.log(id);
			// console.log(`http://localhost:3000/${this.props.id}/edit.json`);

			fetch(`${process.env.API_URL}/${id}`, {
				method: "PUT",
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

					navigateTo(`${location.origin}/${id}`);
				})
				.catch((error) => {
					console.error(error);
				});
		} else if (event.target.className == "delete-form") {
			event.preventDefault();
			// console.log(event.target);
			if (!confirm("삭제하시겠습니까?")) return;

			const form = document.querySelector(".delete-form");

			const id = event.target.dataset.id;
			console.log(id);

			fetch(`${process.env.API_URL}/${id}`, {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
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
					navigateTo(`${location.origin}/`);
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}

	async getPost() {
		try {
			const res = await fetch(`${process.env.API_URL}/${this.props.id}`, {
				method: "GET",
			});

			if (!res.ok) throw new Error("Network Connection Error");
			const data = await res.json();
			return data;
		} catch (error) {
			console.error(error);
		}
	}

	async getHtml() {
		const post = await this.getPost();

		return `
        <form method="POST" class="new-form" data-id=${post._id} >
			<div class="new-form__row">
				
                <label class="new__title-label new--font-large" for="new__title">Title</label>
                <input id="new__title" class="new__title new--font-large" type="text" name="title" required autofocus value=${post.title}>
            </div>
            <div class="new-form__row">
                <label class="new__desc-label new--font-large" for="new__description">Description</label>
				<textarea id="new__description" class="new__description new--font-normal " name="description" rows="20" required>${post.description}</textarea>
			</div>
			<div class="btn-container btn-container--flow-reverse">

			<input class="new__submit-btn new--font-large btn-container__btn" type="submit" value="수정">
			</div>
		</form>
		<form class="delete-form" data-id="${post._id}">
			<button class="btn-container__btn delete-btn"  >삭제</button>
		</form>

        `;
	}
}
