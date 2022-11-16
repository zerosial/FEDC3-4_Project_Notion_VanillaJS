import { isConstructor } from '../../Helpers/checkError.js';
import { documentItem } from './documentItem.js';

export default function RenderDocumentItems({ $target, initialState }) {
  isConstructor(new.target);
  const $documentList = document.createElement('ul');
  $target.appendChild($documentList);

  this.render = async () => {
    const documentList = await initialState;
    $documentList.innerHTML = `${documentList.map(documentItem).join('')}`;
  };

  this.render();
}
