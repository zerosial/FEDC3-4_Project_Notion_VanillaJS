import { request } from "../api/api.js";

export default function PostList({
	$target,
	initialState,
	onPostClick,
	onRemove,
	onToggle,
}) {
	const $postList = document.createElement("ul");
	$target.appendChild($postList);

	this.state = initialState;

	this.setState = (nextState) => {
		console.log(nextState);
		this.state = nextState;
		this.render();
	};

	this.listTemplate = (post) => {
		return `
			<li class="post-list" data-id="${post.id}">
				<div>
					<span class="open-folder icon-right-open"></span>
					<span class="post-title">
						${post.title}
					</span>
				</div>
				<div>
					<button class="delete-page-btn icon-trash"></button>
					<button class="create-page-btn icon-plus"></button>
				</div>
			</li>
			`;
	};

	console.log(this.state);

	this.render = async () => {
		$postList.innerHTML = `
				${this.state.map((post) => this.listTemplate(post)).join("")}
		`;
	};

	$postList.addEventListener("click", (e) => {
		const $li = e.target.closest("li");

		if ($li) {
			const { className } = e.target;
			const { id } = $li.dataset;

			if (className.includes("open-folder")) {
				onToggle(this.state.find((item) => item.id === parseInt(id)));
			} else if (className.includes("delete-page-btn")) {
				onRemove(id);
			} else {
				onPostClick(id);
			}
		}
	});

	this.render();
}
