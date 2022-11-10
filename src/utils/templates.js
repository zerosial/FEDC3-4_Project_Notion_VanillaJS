const onLoadList = (post) => {
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

const createPostModal = () => {
	return `
	<div class="container-modal">
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
</div>
	`;
};

export { onLoadList, createPostModal };
