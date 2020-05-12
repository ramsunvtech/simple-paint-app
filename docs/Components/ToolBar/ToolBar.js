import BaseComponent from '../BaseComponent/BaseComponent.js';

class ToolBar extends BaseComponent {
  constructor() {
    super();
  }

  onMount() {
    const $eraser = this.querySelector('#eraser');
    const $scissor = this.querySelector('#scissor');
    const $glue = this.querySelector('#glue');

    // Event Triggers when Eraser clicked.
    if ($eraser) {
      $eraser.addEventListener('click', (event) => {
        this.$app.dispatchEvent(
          new CustomEvent('onErase', {})
        );
      });
    }

    // Event Triggers when Scissor clicked.
    if ($scissor) {
      $scissor.addEventListener('click', (event) => {
        this.$app.dispatchEvent(
          new CustomEvent('onSplitShape', {})
        );
      });
    }

    // Event Triggers when Glue clicked.
    if ($glue) {
      $glue.addEventListener('click', (event) => {
        this.$app.dispatchEvent(
          new CustomEvent('onGlueShape', {})
        );
      });
    }
  }

  getToolIcon(type, canShow) {
    if (canShow !== "true") {
      return '';
    }

    return `<img
      src="./assets/images/${type}.svg"
      class="toolbar-icons"
      id="${type}"
      title="${type}"
    />`;
  }

  render() {
    const eraser = this.getAttribute('eraser');
    const scissor = this.getAttribute('scissor');
    const glue = this.getAttribute('glue');

    this.innerHTML = `
      <div class="toolbar">
        <div>
          ${this.getToolIcon('eraser', eraser)}
        </div>
        <div>
          ${this.getToolIcon('scissor', scissor)}
        </div>
        <div>
          ${this.getToolIcon('glue', glue)}
        </div>
      </div>
    `;
  }
}

export default ToolBar;
