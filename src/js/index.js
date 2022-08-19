import CatApi from './api/index.js';
import $ from './utils/dom.js';

function App() {
  this.currentPath = ['root'];
  this.nodes = [];
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
  const updateNodes = async (clickedNodeId) => {
    this.nodes = await CatApi.fetchData(clickedNodeId);
    renderNodesSection();
  };

  const renderBreadcrumbSection = () => {
    $('.Breadcrumb').innerHTML = this.currentPath
      .map((item) => `<div>${item}</div>`)
      .join('');
  };

  const updateCurrentPath = (clickedNodeId) => {
    if (clickedNodeId) {
      const clickedNode = this.nodes.find((item) => item.id === clickedNodeId);
      this.currentPath = [...this.currentPath, clickedNode.name];
    }
    renderBreadcrumbSection();
  };

  $('.Nodes').addEventListener('click', (e) => {
    let clickedNodeId;
    if (e.target.classList.contains('Node')) {
      clickedNodeId = e.target.id;
    } else if (e.target.parentNode.classList.contains('Node')) {
      clickedNodeId = e.target.parentNode.id;
    }
    updateCurrentPath(clickedNodeId);
    updateNodes(clickedNodeId);
  });

  const init = () => {
    updateCurrentPath();
    updateNodes();
  };

  init();
}

const app = new App();
