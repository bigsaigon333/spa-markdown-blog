import { logout } from "../api/loginApi";
import AbstractView from "./AbstractView";

export default class Header extends AbstractView {
	constructor(props) {
		super(props);
		const { $parent, isLoggedIn } = props;

		const $nav = document.createElement("nav");
		$nav.id = "nav";
		$nav.className = "nav";

		const $navHeader = document.createElement("header");
		$navHeader.className = "nav__header";
		$navHeader.innerHTML = `<a href="/" data-link> Danny's Blog </a>`;

		const $navList = document.createElement("ul");
		$navList.className = "nav__list";
		this.$navList = $navList;

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
		this.$newListItem = $newListItem;

		const $loginListItem = document.createElement("li");
		$loginListItem.className = "nav__list-item";
		$loginListItem.innerHTML = `
        <a href="/login" data-link >
            Login
		</a>`;
		this.$loginListItem = $loginListItem;

		const $logoutListItem = document.createElement("li");

		$logoutListItem.classList.add("nav__list-item", "logout");
		$logoutListItem.innerText = "Logout";
		$logoutListItem.addEventListener("click", async (e) => {
			const res = await logout();
			if (res) {
				console.log("Logout Succeed");

				this.props.handleLoginStatus(false);
				this.props.navigateTo("/");
			} else console.log("Logout Failed");
		});

		this.$logoutListItem = $logoutListItem;

		$navList.append(
			$portfolioListItem,
			$aboutMeListItem,
			$newListItem,
			$loginListItem,
			$logoutListItem
		);
		$nav.append($navHeader, $navList);

		$parent.appendChild($nav);

		this.setState({ isLoggedIn });
		// this.render();
	}

	render() {
		if (this.state.isLoggedIn) {
			this.$navList.append(this.$newListItem, this.$logoutListItem);
			this.$navList.removeChild(this.$loginListItem);
		} else {
			this.$navList.appendChild(this.$loginListItem);
			this.$navList.removeChild(this.$newListItem);
			this.$navList.removeChild(this.$logoutListItem);
		}
	}
}
