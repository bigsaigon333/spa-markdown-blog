import { getFormattedDate } from "../tools.js";
import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
	constructor(props) {
		super(props);
		this.setTitle("Post");
		// this.id = props.id;
	}

	async getPost() {
		try {
			const res = await fetch(`${process.env.API_URL}/${this.props.id}`, {
				method: "GET",
			});

			if (!res.ok) throw new Error("Network Connection Error");
			const data = await res.json();
			// console.log(this);
			this.post = data;
			return data;
		} catch (error) {
			console.error(error);
		}
	}

	async getHtml() {
		const post = await this.getPost();

		const converter = new showdown.Converter();

		const { _id: id, title, createdAt, description, lastEditedAt } = post;

		return `<article class="blog-container">
			<h1 class="blog__title">${title}</h1>
		<h3 class="blog__createdAt">최초 작성일: ${getFormattedDate(createdAt)}</h3>
		<h3 class="blog__createdAt">마지막 수정일: ${getFormattedDate(
			lastEditedAt
		)}</h3>
		<p class="blog__description">${converter.makeHtml(description)}</p>
		</article>
		<div class="btn-container">
			<a href="${id}/edit" data-link class="btn-container__btn">Edit</a>  
			<a href="/" data-link class="btn-container__btn btn-container__btn--large">Home으로 돌아가기</a>
		</div>`;
	}
}
