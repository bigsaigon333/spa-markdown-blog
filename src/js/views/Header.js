import AbstractView from "./AbstractView";

export default class extends AbstractView {
	constructor(props) {
		super(props);
	}

	getHtml() {
		return `
        <header class='nav__header'>
            <a href="/" data-link> Danny's Blog </a>
        </header>

        <ul class='nav__list'>
            <li class='nav__list-item'>
                <a href="/portfolio" data-link >
                    Portfolio
                </a>
            </li>
            <li class='nav__list-item'>
                <a href="/about-me" data-link>
                    About me
                </a> 
            </li>

            <li class='nav__list-item'>
                <a href="/new" data-link>
                    New
                </a>
            </li>
        </ul>
    `;
	}
}
