function Nodes({ $app, initialState, onClick }) {
  this.state = initialState;
  this.$target = document.createElement('ul');
  $app.appendChild(this.$target);

  this.onClick = onClick;

  this.initEventListeners = () => {
    this.$target.querySelectorAll('.Node').forEach(($node) => {
      $node.addEventListener('click', (e) => {
        const { nodeId } = e.target.dataset;
        const selectedNode = this.state.find((node) => node.id === nodeId);
        this.onClick(selectedNode);
      });
    });
  };

  this.render = () => {
    const nodeTemplate = this.state.nodes
      .map((node) => {
        return `<li class="Node" data-node-id="${node.id}">
            <img src="./assets/${node.type.toLowerCase()}.png">
            <div>${node.name}</div>
          </li>`;
      })
      .join('');
    this.$target.innerHTML = nodeTemplate;
    this.initEventListeners();
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render();
}

export default Nodes;
