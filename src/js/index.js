import CatApi from './api/index.js';
import $ from './utils/dom.js';

function App() {
  this.currentPath = ['root'];
  this.nodes = [];
  this.history = [];

  const goBackToPrevDir = () => {
    updateNodes(this.history[this.history.length - 1].parent?.id);
    this.history.pop();
    this.currentPath.pop();
    renderBreadcrumbSection();
  };

  const initEventListenerToPrevBtn = () => {
    $('#prev-btn').addEventListener('click', () => {
      goBackToPrevDir();
    });
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

  const updateNodes = async (clickedNodeId) => {
    this.nodes = await CatApi.fetchData(clickedNodeId);
    renderNodesSection();
  };

  const renderBreadcrumbSection = () => {
    $('.Breadcrumb').innerHTML = this.currentPath
      .map((item) => `<div>${item}</div>`)
      .join('');
  };

  const removeImageView = () => {
    const $modalElement = $('.Modal');
    $modalElement.parentNode.removeChild($modalElement);
  };

  const initEventListenerToModal = () => {
    $('.Modal').addEventListener('click', (e) => {
      if (e.target.classList.contains('Modal')) {
        removeImageView();
      }
    });
  };

  const renderImageView = (clickedNode) => {
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

  const updateCurrentPath = (clickedNode) => {
    if (clickedNode) {
      this.currentPath = [...this.currentPath, clickedNode.name];
    }
    renderBreadcrumbSection();
  };

  const updateHistory = (clickedNode) => {
    this.history = [...this.history, clickedNode];
  };

  $('.Nodes').addEventListener('click', (e) => {
    let clickedNodeId;
    if (e.target.classList.contains('Node')) {
      clickedNodeId = e.target.id;
    } else if (e.target.parentNode.classList.contains('Node')) {
      clickedNodeId = e.target.parentNode.id;
    }

    const clickedNode = this.nodes.find((item) => item.id === clickedNodeId);
    if (clickedNode.type === 'DIRECTORY') {
      updateHistory(clickedNode);
      updateCurrentPath(clickedNode);
      updateNodes(clickedNodeId);
    } else if (clickedNode.type === 'FILE') {
      renderImageView(clickedNode);
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      removeImageView();
    }
  });

  const init = () => {
    updateCurrentPath();
    updateNodes();
  };

  init();
}

const app = new App();
