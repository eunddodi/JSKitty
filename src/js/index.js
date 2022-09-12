import CatApi from './api/index.js';
import $ from './utils/dom.js';

function App() {
  this.currentPath = ['root'];
  this.nodes = [];
  this.history = [];

  const renderNodesSection = () => {
    $('.Nodes').innerHTML = this.nodes
      .map((item) => {
        return `<div class="Node" id="${item.id}">
            <img src="./assets/${item.type.toLowerCase()}.png">
            <div>${item.name}</div>
          </div>`;
      })
      .join('');
  };

  const renderBreadcrumbSection = () => {
    $('.Breadcrumb').innerHTML = this.currentPath
      .map((item) => `<div>${item}</div>`)
      .join('');
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
  };

  const updateNodes = async (clickedNodeId) => {
    this.nodes = await CatApi.fetchData(clickedNodeId);
    renderNodesSection();
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

  const init = () => {
    updateCurrentPath();
    updateNodes();
  };

  init();
}

const app = new App();
