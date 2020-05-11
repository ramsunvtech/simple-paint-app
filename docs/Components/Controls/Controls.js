import BaseComponent from '../BaseComponent/BaseComponent.js';

class Controls extends BaseComponent {
  constructor() {
    super();
  }

  render() {

    this.innerHTML = `
      <div class="radio-group">
        <input
          type="radio"
          value="Rectangle"
          checked={this.state.selectedOption === "Rectangle"}
          onChange={this.radioChange}
          class="radio-group"
        />
          Rectangle
        <input
          type="radio"
          value="Circle"
          checked={this.state.selectedOption === "Circle"}
          onChange={this.radioChange}
          class="radio-group"
        />
          Circle
        <input
          type="radio"
          value="Triangle"
          checked={this.state.selectedOption === "Triangle"}
          onChange={this.radioChange}
          class="radio-group"
        />
          Triangle
      <div>
    `;
  }
}

export default Controls;
