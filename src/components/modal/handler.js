import { $ } from "../../utils.js";

// 모달 입력 창 닫기
const modalClose = () => {
	$(".container-modal").classList.remove("show");
};

// 모달 입력 창 띄우기
const modalShow = () => {
	$(".container-modal").classList.add("show");
};

export { modalShow, modalClose };
