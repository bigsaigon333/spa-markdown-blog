import AbstractView from "./AbstractView.js";
import { navigateTo } from "../router.js";
import { getPost, putPost, deletePost } from "../api/smbApi.js";

export default class Edit extends AbstractView {
	constructor(props) {
		super(props);
		this.setTitle("Edit");
	}

	async handleEdit(event) {
		event.preventDefault();
		// console.log(event.target);
		if (!confirm("수정하시겠습니까?")) return;

		try {
			const $editForm = document.querySelector("#edit-form");
			const FD = new FormData($editForm);
			const body = Object.fromEntries(FD.entries());

			const id = event.target.dataset.id;
			const result = await putPost(id, body);
			console.log(result);

			if (result != null) navigateTo(`/${id}`);
		} catch (error) {
			console.error(error);
		}
	}

	async handleDelete(event) {
		event.preventDefault();
		if (!confirm("삭제하시겠습니까?")) return;

		try {
			const id = event.target.dataset.id;
			const result = await deletePost(id);

			console.log(result);

			if (result != null) navigateTo("/");
		} catch (error) {
			console.error(error);
		}
	}

	async render() {
		const post = await getPost(this.props.id);

		const $editForm = document.createElement("form");
		$editForm.id = "edit-form";
		$editForm.className = "new-form";
		$editForm.setAttribute("method", "POST");
		$editForm.setAttribute("data-id", post._id);
		// $editForm.addEventListener("submit", this.handleSubmit);

		$editForm.innerHTML = `
			<div class="new-form__row">
				
                <label class="new__title-label new--font-large" for="new__title">Title</label>
                <input id="new__title" class="new__title new--font-large" type="text" name="title" required autofocus value="${post.title}">
            </div>
            <div class="new-form__row">
                <label class="new__desc-label new--font-large" for="new__description">Description</label>
				<textarea id="new__description" class="new__description new--font-normal " name="description" rows="20" required>${post.description}</textarea>
			</div>
		
		`;

		const $btnContainer = document.createElement("div");
		$btnContainer.className = "btn-container";

		const $deleteBtn = document.createElement("button");
		$deleteBtn.className = "btn-container__btn delete-btn";
		$deleteBtn.setAttribute("data-id", post._id);
		$deleteBtn.innerText = "삭제";
		$deleteBtn.addEventListener("click", this.handleDelete);

		const $editBtn = document.createElement("button");
		$editBtn.className = "btn-container__btn delete-btn";
		$editBtn.setAttribute("data-id", post._id);
		$editBtn.innerText = "수정";
		$editBtn.addEventListener("click", this.handleEdit);

		$btnContainer.append($deleteBtn, $editBtn);
		$editForm.append($btnContainer);

		return $editForm;
	}
}
