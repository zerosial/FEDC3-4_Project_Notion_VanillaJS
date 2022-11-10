// import CreatePostModal from "./modal/CreatePostModal.js";

export default function CreatePostButton({ $target, initialState }) {
	const $createBtn = document.createElement("button");
	$target.appendChild($createBtn);

	this.state = initialState;

	this.setState = (nextState) => {
		this.state = nextState;
		this.render();
	};

	this.render = () => {
		$createBtn.textContent = this.state.text;
	};

	this.render();

	$createBtn.addEventListener("click", () => {
		this.setState({
			...this.state,
			open: true,
		});
	});

	// const createPostModal = new CreatePostModal({
	// 	$target,
	// 	initialState: this.state,
	// });
}
