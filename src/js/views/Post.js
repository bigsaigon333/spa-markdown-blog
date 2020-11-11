import showdown from "showdown";

import AbstractView from "./AbstractView.js";
import { getFormattedDate } from "../tools.js";
import { getPost } from "../api/smbApi.js";

export default class Post extends AbstractView {
	constructor(props) {
		super(props);
		this.setTitle("Post");
		const { $parent, id, handleLoadingStatus } = this.props;

		const $article = document.createElement("article");
		this.$article = $article;
		$article.className = "post-container";
		$parent.appendChild($article);

		handleLoadingStatus(true);
		getPost(id)
			.then((post) => this.setState({ post }))
			.finally(() => handleLoadingStatus(false));
	}

	render() {
		if (this.state.post == null) {
			this.props.navigateTo("/");
			return;
		}

		const converter = new showdown.Converter();
		const {
			post: { _id: id, title, createdAt, description, lastEditedAt },
		} = this.state;

		this.$article.innerHTML = `<h1 class="post__title">${title}</h1>
		<h3 class="post__createdAt">최초 작성일: ${getFormattedDate(createdAt)}</h3>
		<h3 class="post__createdAt">마지막 수정일: ${getFormattedDate(
			lastEditedAt
		)}</h3>
		<p class="post__description">${converter.makeHtml(description)}</p>
`;
		if (this.props.isLoggedIn) {
			this.$article.innerHTML += `
			<div class='btn-container'>

		<a href="/${id}/edit" data-link class="btn-container__btn">수정</a>  
		<a href="/" data-link class="btn-container__btn btn-container__btn--large">Home으로 돌아가기</a>
		</div>
		`;
		} else {
			this.$article.innerHTML += `
		<div class='btn-container'>
		<a href="/" data-link class="btn-container__btn btn-container__btn--large">Home으로 돌아가기</a>
		</div>
	
		`;
		}
	}
}
