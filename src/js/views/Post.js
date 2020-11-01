import showdown from "showdown";

import AbstractView from "./AbstractView.js";
import { navigateTo } from "../router.js";
import { getFormattedDate } from "../tools.js";
import { getPost } from "../api/smbApi.js";
import { isLoggedIn } from "../api/loginApi.js";

export default class extends AbstractView {
	constructor(props) {
		super(props);
		this.setTitle("Post");
		// this.id = props.id;
	}

	async render() {
		const post = await getPost(this.props.id);

		if (post == null) {
			navigateTo("/");
			return;
		}

		const converter = new showdown.Converter();

		const { _id: id, title, createdAt, description, lastEditedAt } = post;

		const $article = document.createElement("article");
		$article.className = "post-container";

		$article.innerHTML = `<h1 class="post__title">${title}</h1>
		<h3 class="post__createdAt">최초 작성일: ${getFormattedDate(createdAt)}</h3>
		<h3 class="post__createdAt">마지막 수정일: ${getFormattedDate(
			lastEditedAt
		)}</h3>
		<p class="post__description">${converter.makeHtml(description)}</p>
`;
		if (isLoggedIn()) {
			$article.innerHTML += `
			<div class='btn-container'>

		<a href="/${id}/edit" data-link class="btn-container__btn">수정</a>  
		<a href="/" data-link class="btn-container__btn btn-container__btn--large">Home으로 돌아가기</a>
		</div>
		`;
		} else {
			$article.innerHTML += `
		<div class='btn-container'>
		<a href="/" data-link class="btn-container__btn btn-container__btn--large">Home으로 돌아가기</a>
		</div>
	
		`;
		}
		return $article;
	}
}
