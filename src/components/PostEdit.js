import { getItem } from "../utils/storage.js";
import Editor from "./Editor.js";

export default function PostEdit({ $target, initialState }) {
	const $postEdit = document.createElement("div");
	$postEdit.className = "post-edit-container";

	this.state = initialState;

	let postLocalSaveKey = `temp-post-${this.state.postId}`;

	const post = getItem(postLocalSaveKey, {
		title: "",
		content: "",
	});

	this.setState = (nextState) => {
		this.state = nextState;
		this.render();
	};

	this.render = () => {
		$target.appendChild($postEdit);
	};

	let timer = null;
	const editor = new Editor({
		$target: $postEdit,
		initialState: this.state.post,
		onEditing: (post) => {
			if (timer !== null) {
				clearTimeout(timer);
			}
			timer = setTimeout(async () => {
				setItem(postLocalSaveKey, {
					...post,
					tempSaveDate: new Date(),
				});

				const isNew = this.state.postId === "new";
				if (isNew) {
					const createdPost = await request("/documents", {
						method: "POST",
						body: JSON.stringify(post),
					});
					history.replaceState(null, null, `/posts/${createdPost.id}`);
					removeItem(postLocalSaveKey);

					this.setState({
						postId: createdPost.id,
					});
				} else {
					await request(`/documents/${post.id}`, {
						method: "PUT",
						body: JSON.stringify(post),
					});
					removeItem(postLocalSaveKey);
				}
			}, 2000);
		},
	});

	this.setState = async (nextState) => {};

	this.render();
}
