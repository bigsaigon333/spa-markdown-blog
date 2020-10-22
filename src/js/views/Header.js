import AbstractView from "./AbstractView";

export default class extends AbstractView {
	constructor(props) {
		super(props);
	}

	getHtml() {
		return `<nav>
        <header>
            <a href="/" data-link> Danny's Blog </a>
        </header>

        <ul>
            <!-- <a href="/portfolio" data-link>
                <li>
                    Portfolio
                    <span>①</span>
                </li>
            </a>
            <a href="/blog" data-link>
                <li>Blog</li>
            </a> -->

            <a href="/new" data-link>
                <li>New</li>
            </a>
        </ul>
    </nav>`;
	}
}
