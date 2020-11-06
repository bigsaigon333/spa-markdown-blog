import { isLoggedIn, logout } from "../api/loginApi";
import { navigateTo } from "../router";
import AbstractView from "./AbstractView";

export default class extends AbstractView {
	constructor(props) {
		super(props);
	}

	render() {
		const $nav = document.createElement("nav");
		$nav.id = "nav";
		$nav.className = "nav";

		const $navHeader = document.createElement("header");
		$navHeader.className = "nav__header";
		$navHeader.innerHTML = `<a href="/" data-link> Danny's Blog </a>`;

		const $navList = document.createElement("ul");
		$navList.className = "nav__list";

		const $portfolioListItem = document.createElement("li");
		$portfolioListItem.className = "nav__list-item";
		$portfolioListItem.innerHTML = `
        <a href="/portfolio" data-link >
            Portfolio
        </a>`;

		const $aboutMeListItem = document.createElement("li");
		$aboutMeListItem.className = "nav__list-item";
		$aboutMeListItem.innerHTML = `
        <a href="/about-me" data-link >
            About me  
        </a>`;

		const $newListItem = document.createElement("li");
		$newListItem.className = "nav__list-item";
		$newListItem.innerHTML = `
        <a href="/new" data-link >
            New
        </a>`;

		const $loginListItem = document.createElement("li");
		$loginListItem.className = "nav__list-item";
		$loginListItem.innerHTML = `
        <a href="/login" data-link >
            Login
        </a>`;

		const $logoutListItem = document.createElement("li");

		$logoutListItem.classList.add("nav__list-item", "logout");
		$logoutListItem.innerText = "Logout";
		$logoutListItem.addEventListener("click", async (e) => {
			const res = await logout();
			if (res) {
				console.log("Logout Succeed");
				navigateTo("/");
			} else console.log("Logout Failed");
		});

		$navList.append($portfolioListItem, $aboutMeListItem);

		if (isLoggedIn()) $navList.append($newListItem, $logoutListItem);
		else $navList.append($loginListItem);

		$nav.append($navHeader, $navList);

		return $nav;
	}
}
