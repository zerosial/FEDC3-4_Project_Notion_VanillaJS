import HomePage from "./pages/HomePage.js";
import NotFound from "./pages/NotFound.js";
import { request } from "./api/api.js";
import { initRouter } from "./routes/router.js";

export default function App({ $target }) {
	const $globalContainer = document.createElement("div");
	$globalContainer.className = "global-container";
	$target.appendChild($globalContainer);

	const homePage = new HomePage({ $target: $globalContainer });
	const notFound = new NotFound({ $target: $globalContainer });

	this.route = async () => {
		const { pathname } = window.location;
		if (pathname === "/404") {
			notFound.render();
			return;
		}
	};

	this.route();
	initRouter(() => this.route());

	window.addEventListener("popstate", () => {
		this.route();
	});
}
