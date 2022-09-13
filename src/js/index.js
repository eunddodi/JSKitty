import CatApi from './api/index.js';
import $ from './utils/dom.js';

function App() {
  this.currentPath = ['root'];
  this.nodes = [];
  this.history = [];

  const initEventListenerToModal = () => {
    $('.Modal').addEventListener('click', (e) => {
      if (e.target.classList.contains('Modal')) {
        removeImageView();
      }
    });
  };

  const initEventListenerToPrevBtn = () => {
    $('#prev-btn').addEventListener('click', onPrevBtnClick);
  };

  const renderNodesSection = () => {
    $('.Nodes').innerHTML = this.nodes
      .map((item) => {
        return `<div class="Node" id="${item.id}">
            <img src="./assets/${item.type.toLowerCase()}.png">
            <div>${item.name}</div>
          </div>`;
      })
      .join('');

    if (this.history.length > 0) {
      $('.Nodes').insertAdjacentHTML(
        'afterbegin',
        `<div class="Node" id="prev-btn">
          <img src="./assets/prev.png">
        </div>`,
      );
      initEventListenerToPrevBtn();
    }
  };

  const renderBreadcrumbSection = () => {
    $('.Breadcrumb').innerHTML = this.currentPath
      .map((item) => `<div>${item}</div>`)
      .join('');
  };

  const updateNodes = async (clickedNodeId) => {
    this.nodes = await CatApi.fetchData(clickedNodeId);
    renderNodesSection();
  };

  const removeImageView = () => {
    const $modalElement = $('.Modal');
    $modalElement.parentNode.removeChild($modalElement);
  };

  const onPrevBtnClick = () => {
    updateNodes(this.history[this.history.length - 1].parent?.id);
    this.history.pop();
    this.currentPath.pop();
    renderBreadcrumbSection();
  };

  const onDirClick = (clickedNode) => {
    updateNodes(clickedNode.id);
    this.history = [...this.history, clickedNode];
    this.currentPath = [...this.currentPath, clickedNode.name];
    renderBreadcrumbSection();
  };

  const onFileClick = (clickedNode) => {
    $('main').insertAdjacentHTML(
      'afterend',
      `<div class="Modal ImageViewer">
        <div class="content">
          <img src="https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public${clickedNode.filePath}">
        </div>
      </div>`,
    );

    initEventListenerToModal();
  };

  const onNodeClick = (e) => {
    let clickedNodeId;
    if (e.target.classList.contains('Node')) {
      clickedNodeId = e.target.id;
    } else if (e.target.parentNode.classList.contains('Node')) {
      clickedNodeId = e.target.parentNode.id;
    }

    const clickedNode = this.nodes.find((item) => item.id === clickedNodeId);

    if (clickedNode) {
      if (clickedNode.type === 'DIRECTORY') {
        onDirClick(clickedNode);
      } else if (clickedNode.type === 'FILE') {
        onFileClick(clickedNode);
      }
    }
  };

  $('.Nodes').addEventListener('click', onNodeClick);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      removeImageView();
    }
  });

  const init = () => {
    renderBreadcrumbSection();
    updateNodes();
  };

  init();
}

const app = new App();
