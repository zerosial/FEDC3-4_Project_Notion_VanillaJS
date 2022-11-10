import { setItem, getItem, removeItem } from "../utils/storage.js";
import { totalDirectoryList } from "../utils/totalDirectoryList.js";

export default function DirectoryList({
  $target,
  initialState,
  onClickRootAdd,
  onClickRemove,
  onClickAdd,
}) {
  const $directoryList = document.createElement("div");
  $directoryList.className = "directory-page";
  $target.appendChild($directoryList);
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $directoryList.innerHTML = `
      <button name="add-button" class="root-page-add-button">Add page</button>
      <div class="list-box"></div>
      ${totalDirectoryList(this.state)}
      <div>
    `;
  };

  this.render();

  $directoryList.addEventListener("click", (e) => {
    const { target } = e;
    const element = target.closest("[name]");
    if (element) {
      const { id } = element.dataset;
      const listToggleState = `isOpened-${id}`;
      if (target.className === "toggle-button") {
        const getToggleState = getItem(listToggleState);
        getToggleState
          ? removeItem(listToggleState)
          : setItem(listToggleState, "block");
        this.render();

        return;
      }
      if (target.className === "root-page-add-button") {
        onClickRootAdd();
        return;
      }
      if (target.name === "remove-button") {
        onClickRemove(id);
        return;
      }
      if (target.name === "add-button") {
        onClickAdd(id);
        return;
      }
    }
  });
}
