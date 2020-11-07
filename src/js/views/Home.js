import { getPost } from "../api/smbApi.js";
import { getFormattedDate } from "../tools.js";
import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
	constructor(props) {
		super(props);
		this.setTitle("Home");
	}

	async render() {
		try {
			const postList = await getPost();

			const $postList = document.createElement("section");
			$postList.className = "post-list";

			$postList.innerHTML = postList.reduce((acc, curr) => {
				const { _id: id, title, createdAt, description } = curr;

				return (
					acc +
					`<article class="post-container">
						<a href="/${id}" data-link >
							<h1 class="post__title">${title}</h1>
							<h3 class="post__createdAt">${getFormattedDate(createdAt)}</h3>
						<!-- <p class="post__description">${description}</p> -->
						</a>
					</article>
					<hr>`
				);
			}, "");

			return $postList;
		} catch (error) {
			console.error(error);
			return null;
		}
	}
}
