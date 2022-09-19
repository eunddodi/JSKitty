function Nodes({ $app, initialState }) {
  this.state = initialState;
  this.$target = document.createElement('ul');
  $app.appendChild(this.$target);

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
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render();
}

export default Nodes;
