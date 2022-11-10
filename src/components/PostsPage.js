import { request } from "../api/api.js";
import { push } from "../routes/router.js";
import CreatePostButton from "./CreatePostButton.js";
import PostList from "./PostList.js";

export default function PostsPage({ $target }) {
	const $postPage = document.createElement("div");
	$postPage.className = "post-list-container";

	const postList = new PostList({
		$target: $postPage,
		initialState: [],

		onRemove: (e) => {
			console.log(e);
		},
		onPostClick: (id) => {
			push(`/posts/${id}`);
		},
		onToggle: (e) => {
			const { documents } = e;
			if (documents.length > 0) {
				console.log(documents);
			}
		},
	});

	new CreatePostButton({
		$target: $postPage,
		initialState: {
			open: false,
			text: "새 페이지 추가",
		},
	});

	this.setState = async () => {
		const posts = await request(`/documents`, {
			options: "GET",
		});
		postList.setState(posts);
		this.render();
	};

	this.render = () => {
		$target.appendChild($postPage);
	};
}
