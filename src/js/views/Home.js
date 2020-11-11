import { getPost } from "../api/smbApi.js";
import { getFormattedDate } from "../tools.js";
import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
	constructor(props) {
		super(props);
		this.setTitle("Home");

		const { $parent, handleLoadingStatus } = this.props;

		const $postList = document.createElement("div");
		this.$postList = $postList;
		$postList.className = "post-list";
		$parent.appendChild($postList);
		handleLoadingStatus(true);

		getPost()
			.then((postList) => {
				this.setState({ postList });
			})
			.catch((error) => {
				console.error(error);
				this.setState({ postList: [] });
			})
			.finally(() => handleLoadingStatus(false));
	}

	setState({ postList }) {
		this.state.postList = postList;
		this.render();
	}

	render() {
		this.$postList.innerHTML = this.state.postList.reduce((acc, curr) => {
			const { _id: id, title, createdAt } = curr;

			return (
				acc +
				`<article class="post-container">
						<a href="/${id}" data-link >
							<h1 class="post__title">${title}</h1>
							<h3 class="post__createdAt">${getFormattedDate(createdAt)}</h3>
						</a>
					</article>
					<hr>`
			);
		}, "");
	}
}
