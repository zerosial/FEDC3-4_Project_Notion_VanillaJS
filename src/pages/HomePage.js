import { $home } from "../utils/templates.js";
import PostEdit from "../components/PostEdit.js";
import PostsPage from "../components/PostsPage.js";
import { request } from "../api/api.js";
import { initRouter } from "../routes/router.js";

export default function HomePage({ $target }) {
	const $postListContainer = document.createElement("div");
	const $postEditContainer = document.createElement("div");

	$postListContainer.className = "post-list-container";
	$postEditContainer.className = "post-edit-container";

	$target.appendChild($postListContainer);
	$target.appendChild($postEditContainer);

	this.state = {
		postList: [],
		id: "",
		post: {
			title: "",
			content: "",
		},
	};

	this.setState = (nextState) => {
		this.state = nextState;
		postsPage.setState(this.state.postList);
	};

	const postsPage = new PostsPage({
		$target: $postListContainer,
		initialState: [],
		getPost: (post) => {
			postEdit.setState(post);
		},
	});

	const postEdit = new PostEdit({
		$target: $postEditContainer,
		initialState: {
			id: "",
			post: {
				title: "",
				content: "",
			},
		},
	});

	const fetchPostList = async () => {
		const postList = await request("/documents", {
			options: "GET",
		});
		this.setState({
			...this.state,
			postList,
		});
	};

	const init = async () => {
		const { pathname } = window.location;
		if (pathname === "/") {
			await fetchPostList();
			return;
		} else if (pathname.indexOf("/documents/") === 0) {
			const [, , id] = pathname.split("/");
			if (id === "new") {
				postEdit.setState({ id });
				await fetchPostList();
				return;
			} else {
				const post = await request(`/documents/${id}`, {
					options: "GET",
				});
				postEdit.setState(post);
				await fetchPostList();
				return;
			}
		}
	};
	init();
	initRouter(() => init());

	window.addEventListener("popstate", () => {
		init();
	});
}
