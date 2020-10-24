import { getFormattedDate } from "../tools.js";
import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
	constructor(props) {
		super(props);
		this.setTitle("Home");
	}

	async getBlogList() {
		try {
			const res = await fetch(process.env.API_URL, {
				method: "GET",
				mode: "cors",
			});
			if (!res.ok) throw new Error("Network Connection Error");
			const data = await res.json();
			// console.log(data);
			return data;
		} catch (error) {
			console.error(error);
		}
	}

	async getHtml() {
		try {
			const blogList = await this.getBlogList();
			return blogList.reduce((acc, curr) => {
				const { _id: id, title, createdAt, description } = curr;

				return (
					acc +
					`<article class="blog-container">
						<a href="/${id}" data-link >
							<h1 class="blog__title">${title}</h1>
							<h3 class="blog__createdAt">${getFormattedDate(createdAt)}</h3>
						<!-- <p class="blog__description">${description}</p> -->
						</a>
					</article>
					<hr>`
				);
			}, "");
		} catch (error) {
			return error;
		}
	}
}
