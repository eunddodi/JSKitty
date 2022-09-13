function Nodes({ $app }) {
  this.state = [];
  this.$target = document.createElement('ul');
  $app.appendChild(this.$target);

  this.render = () => {
    this.$target.innerHTML = this.state
      .map((item) => {
        return `<li class="Node" id="${item.id}">
            <img src="./assets/${item.type.toLowerCase()}.png">
            <div>${item.name}</div>
          </li>`;
      })
      .join('');
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render();
}

export default Nodes;
