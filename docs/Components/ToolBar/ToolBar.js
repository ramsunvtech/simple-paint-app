import BaseComponent from '../BaseComponent/BaseComponent.js';

class ToolBar extends BaseComponent {
  constructor() {
    super({
      controlType: 'Rectangle'
    });
  }

  onMount() {
    const $eraser = this.querySelector('#eraser');
    const $scissor = this.querySelector('#scissor');
    const $glue = this.querySelector('#glue');

    // Event Triggers when Eraser clicked.
    $eraser.addEventListener('click', (event) => {
      this.$app.dispatchEvent(
        new CustomEvent('onErase', {})
      );
    });

    // Event Triggers when Scissor clicked.
    $scissor.addEventListener('click', (event) => {
      this.$app.dispatchEvent(
        new CustomEvent('onSplitShape', {})
      );
    });

    // Event Triggers when Glue clicked.
    $glue.addEventListener('click', (event) => {
      this.$app.dispatchEvent(
        new CustomEvent('onGlueShape', {})
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
            id="scissor"
            title="Scissor"
          />
        </div>
        <div>
          <img
            src="./assets/images/glue.svg"
            class="toolbar-icons"
            id="glue"
            title="Glue"
          />
        </div>
      </div>
    `;
  }
}

export default ToolBar;
