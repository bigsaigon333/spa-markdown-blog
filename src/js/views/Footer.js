import AbstractView from "./AbstractView";

export default class Footer extends AbstractView {
	constructor(props) {
		super(props);
	}

	render() {
		const footer = document.createElement("footer");
		footer.classList.add("footer");

		const leftSpan = document.createElement("span");
		leftSpan.classList.add("footer__item");
		leftSpan.innerHTML = `&copy; ${new Date().getFullYear()} All rights reserved by Danny`;

		const rightSpan = document.createElement("span");
		rightSpan.classList.add("footer__item");
		rightSpan.innerHTML = `
			<a href='https://app.netlify.com/sites/dannys/deploys' target='_blank'>
				<img src='https://api.netlify.com/api/v1/badges/b36ac5cb-7c67-4a65-a0d4-5459ad5b57f2/deploy-status'/ alt='Deploy status badge' loading='lazy'>
			</a>
		`;

		footer.appendChild(leftSpan);
		footer.appendChild(rightSpan);

		return footer;
	}
}
