export default function Editor({
	$target,
	initialState = {
		title: "",
		content: "",
	},
	onEditing,
}) {
	const $editor = document.createElement("div");
	$editor.className = "editor";
	let isInitialize = false;
	this.state = initialState;
	$target.appendChild($editor);

	this.render = () => {
		if (!isInitialize) {
			$editor.innerHTML = `
			<input type="text" name="title" value="${this.state.title}"/>
			<textarea name="content">${this.state.content}</textarea>
			`;
			isInitialize = true;
		}
	};

	this.render();
}
