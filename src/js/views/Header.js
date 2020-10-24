import AbstractView from "./AbstractView";

export default class extends AbstractView {
	constructor(props) {
		super(props);
	}

	getHtml() {
		return `
        <header>
            <a href="/" data-link> Danny's Blog </a>
        </header>

        <ul>
            <a href="/portfolio" data-link>
                <li>
                    Portfolio
                </li>
            </a>
            <a href="/about-me" data-link>
                <li>About me</li>
            </a> 


            <a href="/new" data-link>
                <li>New</li>
            </a>
        </ul>
    `;
	}
}
