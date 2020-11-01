import AbstractView from "./AbstractView.js";
import { navigateTo } from "../router.js";
import { postPost } from "../api/smbApi.js";

export default class extends AbstractView {
	constructor(props) {
		super(props);
		this.setTitle("New");
	}

	async handleSubmit(event) {
		event.preventDefault();
		if (!confirm("제출하시겠습니까?")) return;

		const $newForm = document.querySelector(".new-form");
		const FD = new FormData($newForm);
		const body = Object.fromEntries(FD.entries());

		const data = await postPost(body);

		if (data != null) navigateTo(location.origin);
		// else TODO: Error UI 처리
	}

	render() {
		const $newForm = document.createElement("form");
		$newForm.className = "new-form";
		$newForm.setAttribute("method", "POST");
		$newForm.addEventListener("submit", this.handleSubmit);

		$newForm.innerHTML = `
            <div class="new-form__row">
                <label class="new__title-label new--font-large" for="new__title">Title</label>
                <input id="new__title" class="new__title new--font-large" type="text" name="title" required autofocus>
            </div>
            <div class="new-form__row">
                <label class="new__desc-label new--font-large" for="new__description">Description</label>
                <textarea id="new__description" class="new__description new--font-normal " name="description" rows="20" required></textarea>
            </div>
            
            <input class="new__submit-btn new--font-large" type="submit" value="제출">
		`;

		return $newForm;
	}
}
