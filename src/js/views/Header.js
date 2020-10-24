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
            
            <a href='https://app.netlify.com/sites/dannys/deploys' target='_blank'>
            <li>
            <img src='https://api.netlify.com/api/v1/badges/b36ac5cb-7c67-4a65-a0d4-5459ad5b57f2/deploy-status'/ alt='Deploy status badge' loading='lazy'>
            </li>
            </a>
            
                        <a href="/new" data-link>
                            <li>New</li>
                        </a>
        </ul>
    </nav>`;
	}
}
