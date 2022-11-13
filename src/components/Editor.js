import { getItem } from "../utils/storage.js";
import { $editPost, $home } from "../utils/templates.js";

export default function Editor({ $target, initialState, onEditing }) {
	const $editor = document.createElement("div");
	$editor.className = "editor";
	this.state = initialState;

	let isInitialize = false;
	// let postLocalSaveKey = `temp-post-${this.state.id}`;

	// // 저장된 내용 불러오기
	// const post = getItem(postLocalSaveKey, {
	// 	title: "",
	// 	content: "",
	// });

	this.setState = (nextState) => {
		this.state = nextState;
		console.log(this.state);
		this.render();
	};

	this.render = () => {
		$target.appendChild($editor);
		const { id } = this.state;
		if (id === "new") {
			this.setState({ title: "", content: "" });
		}
		$editor.innerHTML = $editPost(this.state);
	};

	this.render();

	$editor.addEventListener("keyup", (e) => {
		const { target } = e;
		const name = target.getAttribute("name");

		if (this.state[name] !== undefined) {
			const nextState = {
				...this.state,
				[name]: target.value,
			};
			this.setState(nextState);
			console.log(nextState);
		}
	});
}
