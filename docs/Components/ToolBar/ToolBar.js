import BaseComponent from '../BaseComponent/BaseComponent.js';

class ToolBar extends BaseComponent {
  constructor() {
    super();
  }

  onMount() {
    const $eraser = this.querySelector('#eraser');

    // Event Triggers when Eraser clicked.
    $eraser.addEventListener('click', (event) => {
      this.$app.dispatchEvent(
        new CustomEvent('onErase', {})
      );
    });
  }

  render() {

    this.innerHTML = `
      <div class="toolbar">
        <div>
          <img
            src="./assets/images/eraser.svg"
            class="toolbar-icons"
            id="eraser"
            title="Eraser"
          />
        </div>
        <div>
          <img
            src="./assets/images/scissor.svg"
            class="toolbar-icons"
            title="Scissor"
          />
        </div>
        <div>
          <img
            src="./assets/images/glue.svg"
            class="toolbar-icons"
            title="Glue"
          />
        </div>
      </div>
    `;
  }
}

export default ToolBar;
