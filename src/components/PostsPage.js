import { request } from "../api/api.js";
import { push } from "../routes/router.js";
import { getItem, removeItem, setItem } from "../utils/storage.js";
import CreatePostButton from "./CreatePostButton.js";
import PostList from "./PostList.js";
import SideNavHeader from "./SideNavHeader.js";

export default function PostsPage({ $target, initialState, getPost }) {
	const $postPage = document.createElement("div");

	this.state = initialState;

	this.setState = (nextState) => {
		this.state = nextState;
		postList.setState(this.state);
		this.render();
	};

	new SideNavHeader({ $target: $postPage });
	const postList = new PostList({
		$target: $postPage,
		initialState: [],

		onRemove: async (post) => {
			if (confirm(`제목 : ${post.title}\n해당 글을 삭제할까요?`)) {
				const res = await request(`/documents/${post.id}`, {
					options: "DELETE",
				});
				console.log(res);
				// this.render();
			}
		},

		onPostClick: async (id) => {
			push(`/documents/${id}`);

			const posts = await request(`/documents/${id}`, {
				options: "GET",
			});
			getPost(posts);
		},

		// onToggle: (e) => {
		// 	const { documents } = e;
		// 	console.log(documents);
		// 	if (documents.length === 0) {

		// 	}
		// },
	});

	new CreatePostButton({
		$target: $postPage,
		initialState: { link: "/documents/new" },
	});

	this.render = () => {
		$target.appendChild($postPage);
	};

	this.render();
}
