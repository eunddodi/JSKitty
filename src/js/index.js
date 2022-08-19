import CatApi from './api/index.js';
import $ from './utils/dom.js';

function App() {
  this.currentPath = ['root'];
  this.nodes = [];

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
  });

  const init = () => {
    updateCurrentPath();
  };

  init();
}

const app = new App();
