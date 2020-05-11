import BaseComponent from '../BaseComponent/BaseComponent.js';

class Area extends BaseComponent {
  constructor() {
    super();
  }

  render() {

    this.innerHTML = `
      <div class="paint-container">
        <canvas
          id="paint-area"
          width="500"
          height="400"
        />
      </div>
    `;
  }
}

export default Area;
