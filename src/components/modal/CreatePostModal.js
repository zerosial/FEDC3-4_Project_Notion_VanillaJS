export default function CreatePostModal({ $target, initialState }) {
	const $modal = document.createElement("div");
	$target.appendChild($modal);

	this.state = initialState;
	console.log(this.state);

	this.setState = (nextState) => {
		this.state = nextState;
		if (this.state) modalShow();
		else modalClose();
	};

	// 모달 입력 창 닫기
	const modalClose = () => {
		document.querySelector(".container-modal").classList.remove("show");
		this.render();
	};

	// 모달 입력 창 띄우기
	const modalShow = () => {
		document.querySelector(".container-modal").classList.add("show");
		this.render();
	};

	this.render = () => {
		$modal.innerHTML = `
			<div class="overlay"></div>
			<div class="modal">
				<div class="modal-title">
					<input type="text" name="title" placeholder="제목을 입력하세요."/>
				</div>
				<div class="modal-content">
				<input
						type="text"
						name="content"
						placeholder="내용을 입력하세요."
					/>
				</div>
			</div>
	`;
	};

	this.render();
}
