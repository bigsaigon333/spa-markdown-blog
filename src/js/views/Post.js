import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
	constructor(props) {
		super(props);
		this.setTitle("Post");
		// this.id = props.id;
	}

	async getPost() {
		try {
			const res = await fetch(
				`http://localhost:3000/blog_list.json/${this.props.id}`,
				{
					method: "GET",
				}
			);

			if (!res.ok) throw new Error("Network Connection Error");
			const data = await res.json();
			return data;
		} catch (error) {
			console.error(error);
		}
	}

	async getHtml() {
		// const id = this.props.id;
		const post = await this.getPost();

		// console.log(post);

		// return `${post.description}`

		const { title, createdAt, description, lastEditedAt } = post;

		return `<article class="blog-container">
			<h1 class="blog__title">${title}</h1>
		<h3 class="blog__createdAt">최초 작성일: ${new Date(
			createdAt
		).toLocaleString()}</h3>
		<h3 class="blog__createdAt">마지막 수정일: ${new Date(
			lastEditedAt
		).toLocaleString()}</h3>
		<p class="blog__description">${description}</p>
		</article>
		<a href="#" data-link>Edit</a>  
		<a href="/" data-link>Home으로 돌아가기</a>`;
	}
}
