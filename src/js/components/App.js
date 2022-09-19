import BreadCrumb from './BreadCrumb';
import Nodes from './Nodes';

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
}

export default App;
