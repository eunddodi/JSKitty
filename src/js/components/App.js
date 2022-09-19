import BreadCrumb from './BreadCrumb.js';
import Nodes from './Nodes.js';
import CatApi from '../api/index.js';

function App($app) {
  this.state = {
    isRoot: false,
    nodes: [],
    path: [],
  };

  const onNodeClick = (clickedNode) => {
    if (clickedNode.type === 'DIRECTORY') {
      // DIRECTORY인 경우 처리
    } else if (clickedNode.type === 'FILE') {
      // FILE인 경우 처리
    }
  };

  const breadcrumb = new BreadCrumb({ $app, initialState: this.state.path });
  const nodes = new Nodes({
    $app,
    initialState: {
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    },
    onClick: onNodeClick,
  });

  this.setState = (nextState) => {
    this.state = nextState;
    breadcrumb.setState(this.state.path);
    nodes.setState({ isRoot: this.state.isRoot, nodes: this.state.nodes });
  };

  const init = async () => {
    try {
      const rootNodes = await CatApi.fetchData();
      this.setState({ ...this.state, isRoot: true, nodes: rootNodes });
    } catch (e) {
      // Error handling
    }
  };

  init();
}

export default App;
