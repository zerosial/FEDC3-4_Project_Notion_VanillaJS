import PostList from "./components/PostList.js";
import PostsPage from "./components/PostsPage.js";
import PostEdit from "./components/PostEdit.js";
import { request } from "./api/api.js";
import { initRouter } from "./routes/router.js";

export default function App({ $target }) {
	const postsPage = new PostsPage({
		$target,
	});

	const postEdit = new PostEdit({
		$target,
		initialState: {
			postId: "new",
			post: {
				title: "",
				content: "",
			},
		},
	});

	this.route = () => {
		$target.innerHTML = "";
		const { pathname } = window.location;

		if (pathname === "/") {
			postsPage.setState();
		} else if (pathname.indexOf("/documents/") === 0) {
			const [, , postId] = pathname.split("/");
			postEdit.setState({ postId });
		}
	};

	this.route();

	initRouter(() => this.route());
}
