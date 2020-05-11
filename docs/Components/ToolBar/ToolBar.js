import BaseComponent from '../BaseComponent/BaseComponent.js';

class ToolBar extends BaseComponent {
  constructor() {
    super();
  }

  render() {

    this.innerHTML = `
      <div class="toolbar">
        <div>
          <img
            src="./assets/images/eraser.svg"
            class="toolbar-icons"
          />
        </div>
        <div>
          <img
            src="./assets/images/scissor.svg"
            class="toolbar-icons"
          />
        </div>
        <div>
          <img
            src="./assets/images/glue.svg"
            class="toolbar-icons"
          />
        </div>
      </div>
    `;
  }
}

export default ToolBar;
