import AbstractView from "./AbstractView.js";
import { getPost, putPost, deletePost } from "../api/smbApi.js";

export default class Edit extends AbstractView {
	constructor(props) {
		super(props);
		this.setTitle("Edit");

		const { $parent } = props;

		const $editForm = document.createElement("form");
		$editForm.id = "edit-form";
		$editForm.className = "new-form";
		$editForm.setAttribute("method", "POST");
		this.$editForm = $editForm;

		this.$editForm.innerHTML = `
			<div class="new-form__row">
				
                <label class="new__title-label new--font-large" for="new__title">Title</label>
                <input id="edit__title" class="new__title new--font-large" type="text" name="title" required >
            </div>
            <div class="new-form__row">
                <label class="new__desc-label new--font-large" for="new__description">Description</label>
				<textarea id="edit__description" class="new__description new--font-normal " name="description" rows="20" required></textarea>
			</div>
		`;

		const $btnContainer = document.createElement("div");
		$btnContainer.className = "btn-container";

		const $deleteBtn = document.createElement("button");
		$deleteBtn.className = "btn-container__btn delete-btn";
		$deleteBtn.innerText = "삭제";
		$deleteBtn.addEventListener("click", (e) => this.handleDelete(e));

		const $editBtn = document.createElement("button");
		$editBtn.className = "btn-container__btn delete-btn";
		$editBtn.innerText = "수정";
		$editBtn.addEventListener("click", (e) => this.handleEdit(e));

		$btnContainer.append($deleteBtn, $editBtn);
		$editForm.append($btnContainer);

		$parent.appendChild($editForm);

		getPost(this.props.id).then((post) => this.setState({ post }));
	}

	async handleEdit(event) {
		event.preventDefault();
		// console.log(event.target);
		if (!confirm("수정하시겠습니까?")) return;

		try {
			const $editForm = document.querySelector("#edit-form");
			const FD = new FormData($editForm);
			const body = Object.fromEntries(FD.entries());

			const id = this.props.id;
			const result = await putPost(id, body);
			console.log(result);

			if (result != null) this.props.navigateTo(`/${id}`);
		} catch (error) {
			console.error(error);
		}
	}

	async handleDelete(event) {
		event.preventDefault();
		if (!confirm("삭제하시겠습니까?")) return;

		try {
			const id = this.props.id;
			const result = await deletePost(id);

			console.log(result);

			if (result != null) this.props.navigateTo("/");
		} catch (error) {
			console.error(error);
		}
	}

	render() {
		const {
			post: { title, description },
		} = this.state;

		document.querySelector("#edit__title").value = title;
		document.querySelector("#edit__description").innerHTML = description;
	}
}
