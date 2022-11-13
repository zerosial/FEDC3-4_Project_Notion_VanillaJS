import { getItem, setItem } from "../utils/storage.js";
import { $editPost, $home } from "../utils/templates.js";
import Editor from "./Editor.js";

export default function PostEdit({ $target, initialState }) {
	const $postEdit = document.createElement("div");
	$postEdit.className = "post-form";

	this.state = initialState;

	// post를 받거나 id:new를 받거나
	this.setState = async (nextState) => {
		this.state = nextState;
		this.render();
	};

	let timer = null;
	const editor = new Editor({
		$target: $postEdit,
		initialState: this.state,
		onEditing: (post) => {
			console.log(post);
		},
	});

	this.render = () => {
		$target.appendChild($postEdit);
		const { id } = this.state;
		console.log(id);
		if (id === "") {
			$postEdit.innerHTML = $home();
			return;
		} else if (id === "new") {
			$postEdit.innerHTML = "";
			editor.setState(this.state);
			return;
		} else {
			$postEdit.innerHTML = "";
			editor.setState(this.state);
			return;
		}
	};

	this.render();
}
