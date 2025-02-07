import {
  checkDocumentPath,
  checkConstructor,
  checkNumber,
  checkString,
} from './Helpers/checkError.js';
import {
  getDocumentAll,
  getDocumentById,
  postDocument,
  putDocument,
  deleteDocument,
} from './Helpers/api.js';
import DocumentList from './Components/DocumentList/DocumentList.js';
import RenderDocumentItems from './Components/DocumentList/RenderDocumentItems.js';
import DocumentEditor from './Components/DocumentEditor/DocumentEditor.js';
import { documentItem } from './Components/DocumentList/documentItem.js';
import { init, routeChange } from './Helpers/router.js';
import { getItems, initBaseLocalData, removeItems, setItems } from './Helpers/localstorage.js';
import {
  ALERT_DELETE_DOCUMENT,
  CHANGE_API_DATA_TO_LOCAL_DATA,
  CHANGE_USER_NAME,
  NEW_TITLE,
  NEW_ROOT_ID,
} from './Constant/normal.js';
import { getUserIdToAdress } from './Helpers/getUserIdToAdress.js';
import { BASE_INIT_USERNAME } from './Constant/api.js';

export default function App({ $app }) {
  checkConstructor(new.target);
  $app.innerHTML = `
    <aside class=" bg-stone-100 text-sm text-stone-500">
      <div>사이드리스트 로딩중</div>
    </aside>
    <main class="col-span-4">
      <div>왼쪽의 리스트나 새 페이지를 눌러주세요</div>
    </main>
  `;

  const $aside = $app.querySelector('aside');
  const $main = $app.querySelector('main');
  let selectedTitle;
  const documentList = new DocumentList({
    $target: $aside,
    initialState: getDocumentAll(),
    postDocumentEvent: async ({ $target }) => {
      const $parant = $target.closest('[data-id]');
      const $childList = $parant.children[1];
      const id = $parant.dataset.id;
      postDocument({
        title: NEW_TITLE,
        parent: id,
      });
      if ($childList) {
        $childList.insertAdjacentHTML(
          'beforeend',
          documentItem({
            id,
            title: NEW_TITLE,
          })
        );
      }
    },

    deleteDocumentEvent: async ({ $target }) => {
      const confirmDelete = confirm(ALERT_DELETE_DOCUMENT);
      if (confirmDelete) {
        const $parant = $target.closest('[data-id]');
        const id = $parant.dataset.id;
        deleteDocument({
          id,
        });
        $parant.remove();
      }
    },

    showChildDocumentEvent: async ({ $target }) => {
      const $parant = $target.closest('[data-id]');
      const id = $parant.dataset.id;
      const initialState = await getDocumentById({ id });
      new RenderDocumentItems({
        $target: $parant,
        initialState: await initialState.documents,
      });
      $target.dataset.event = 'hideChildDocumentButton';
      $target.style.transform = 'rotate(0deg)';
    },

    hideChildDocumentEvent: async ({ $target }) => {
      const $parant = $target.closest('[data-id]');
      const $childList = $parant.children[1];
      $parant.removeChild($childList);
      $target.dataset.event = 'showChildDocumentButton';
      $target.style.transform = 'rotate(-90deg)';
    },

    setEditorEvent: async ({ $target }) => {
      const $parant = $target.closest('[data-id]');
      const $text = $parant.querySelector('SPAN');
      const documentId = $parant.dataset.id;
      if (selectedTitle) {
        selectedTitle.classList.remove('font-black');
        selectedTitle.classList.remove('text-lg');
      }
      $text.classList.add('font-black');
      $text.classList.add('text-lg');
      selectedTitle = $text;
      checkNumber(documentId);
      const userId = getUserIdToAdress();
      routeChange(`/FEDC3-4_Project_Notion_VanillaJS/${userId}/documents/${documentId}`);
    },

    changeUserEvent: () => {
      const baseId = getUserIdToAdress();
      const userId = prompt(CHANGE_USER_NAME, baseId);
      if (userId) {
        initBaseLocalData(userId);
        routeChange(`/FEDC3-4_Project_Notion_VanillaJS/${userId ? userId : baseId}`);
        documentList.setState(getDocumentAll());
      }
    },

    newPageEvent: async () => {
      const $documentList = $app.querySelector('#documentList UL');
      const userId = getUserIdToAdress();
      const { id, title } = await postDocument({
        title: NEW_TITLE,
      });

      $documentList.insertAdjacentHTML(
        'beforeend',
        documentItem({
          id,
          title,
        })
      );

      const $addedDocument = $documentList.lastChild;
      if (selectedTitle) {
        selectedTitle.classList.remove('font-black');
        selectedTitle.classList.remove('text-lg');
      }
      $addedDocument.classList.add('font-black');
      $addedDocument.classList.add('text-lg');
      selectedTitle = $addedDocument;

      routeChange(`/FEDC3-4_Project_Notion_VanillaJS/${userId}/documents/${id}`);
    },
  });

  this.route = async () => {
    const [, , userId, document, documentId] = location.pathname.split('/');
    if (!userId) {
      initBaseLocalData(BASE_INIT_USERNAME);
      routeChange(`/FEDC3-4_Project_Notion_VanillaJS/${BASE_INIT_USERNAME}`);
    }

    if (document) {
      checkString(userId);
      checkNumber(documentId);
      checkDocumentPath(document);

      const documentEditor = new DocumentEditor({
        $target: $main,
        initialState: {
          id: NEW_ROOT_ID,
          title: NEW_TITLE,
          content: null,
        },
        saveApi: async ({ $target }) => {
          const $editor = $target.closest('[data-id]');
          const id = $editor.dataset.id;
          const [$title, $content] = $editor.querySelectorAll('[contenteditable=true]');
          const [title, content] = [$title.innerHTML, $content.innerHTML];
          putDocument({
            id,
            title,
            content,
          });
          const $documentItem = $app.querySelector(`[data-id="${id}"] SPAN`);
          $documentItem.innerHTML = title;
          removeItems(id);
        },

        saveLocalStorage: ({ $target }) => {
          const $editor = $target.closest('[data-id]');
          const id = $editor.dataset.id;
          const [$title, $content] = $editor.querySelectorAll('[contenteditable=true]');
          const [title, content] = [$title.innerHTML, $content.innerHTML];
          setItems({
            id,
            value: {
              title,
              content,
              tempUpdateAt: new Date(),
            },
          });
        },
      });

      const apiData = await getDocumentById({ id: documentId });
      const localData = getItems(documentId);
      documentEditor.setState(apiData);
      if (localData?.tempUpdateAt > apiData.updatedAt) {
        const changeApiDataToLocalData = confirm(CHANGE_API_DATA_TO_LOCAL_DATA);
        if (changeApiDataToLocalData) {
          putDocument({
            id: documentId,
            title: localData.title,
            content: localData.content,
          });
        }
        removeItems(documentId);
        location.reload();
      }
    }
  };

  init(this.route);
  this.route();
}
