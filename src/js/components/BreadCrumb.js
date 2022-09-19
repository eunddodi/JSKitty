function BreadCrumb({ $app, initialState }) {
  this.state = initialState;
  this.$target = document.createElement('nav');
  $app.appendChild(this.$target);

  this.render = () => {
    this.$target.innerHTML = this.state
      .map((item) => `<div class="nav-item">${item}</div>`)
      .join('');
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
}

export default BreadCrumb;
