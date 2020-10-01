import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
	constructor(params) {
		super(params);
		this.setTitle("Blog");
		// this.blogs
	}
	async getBlogList() {
		try {
			const res = await fetch("http://localhost:3000/blog_list.json", {
				method: "GET",
			});
			if (!res.ok) throw new Error("Network Connection Error");
			const data = await res.json();
			console.log(data);
			return data;
		} catch (error) {
			console.error(error);
		}
	}

	async getHtml() {
		try {
			const blogList = await this.getBlogList();
			return blogList.reduce((acc, curr) => {
				const { title, createdAt, description } = curr;

				return (
					acc +
					`<article class="blog-container">
					<h1 class="blog__title">${title}</h1>
				<h3 class="blog__createdAt">${new Date(createdAt).toLocaleString()}</h3>
				<p class="blog__description">${description}</p>
				</article>
				<hr>`
				);
			}, "");
		} catch (error) {
			return error;
		}
	}
}
