import AbstractView from "./AbstractView";
import showdown from "showdown";

export default class extends AbstractView {
	constructor(props) {
		super(props);
		this.setTitle("Login");
		const { $parent } = this.props;

		const $portfolio = document.createElement("article");
		this.$portfolio = $portfolio;

		const converter = new showdown.Converter();

		const markdownPortfolioDescription = `# Portfolio\n
### 1. Single Page Application\n
\n
1. Language: Vanilla JS\n
2. Description\n
    - Vanilla JS만으로 구현한 블로그 Single Page Application\n
    - RESTful API Server와 비동기통신을 통하여 데이터 수신\n
    - 블로그 글은 markdown language로 작성하여, showdownJS를 통하여 HTML으로 변환함\n
    - netlify로 배포\n
    \n
3. Github: [spa-markdown-blog](https://github.com/bigsaigon333/spa-markdown-blog)\n
\n
\n
\n
\n
<br>
### 2. RESTful API Server\n
\n
1. Language: Vanilla JS\n
2. Description\n
    - 블로그 Single Page Application의 Backend\n
    - heroku를 통하여 배포\n
    - MongoDB 및 MongoAtlas 사용\n
3. Github: [dannys-api](https://github.com/bigsaigon333/dannys-api)\n
\n
\n
\n
\n
<br>
### 3. Javascript DataStructure Library\n
\n
1. Language: Vanilla JS\n
2. Description\n
    - 알고리즘 문제 풀이시 자주 사용되는 데이터구조를 자바스크립트로 구현\n
    - JestJS 사용하여 Test Driven Development로 개발\n
    - Heap, Deque 구현\n
3. Github: [js-data-structure](https://github.com/bigsaigon333/js-data-structure)\n
\n
        `;

		$portfolio.innerHTML = converter.makeHtml(markdownPortfolioDescription);

		$parent.appendChild($portfolio);
	}
}
