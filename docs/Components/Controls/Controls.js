import BaseComponent from '../BaseComponent/BaseComponent.js';

class Controls extends BaseComponent {
  constructor() {
    super();
  }

  onMount() {
    const radioGroups = this.querySelectorAll('.radio-group');

    for (const $radioInput of radioGroups) {
      $radioInput.addEventListener('change', (event) => {
        this.$app.dispatchEvent(
          new CustomEvent('onControlChange', {
            detail: event.target.value
          })
        );
      });
    }
  }

  render() {
    const {
      controlType
    } = this.state;

    this.innerHTML = `
      <div class="radio-group">
        <input
          type="radio"
          name="shapes"
          value="Rectangle"
          ${controlType === "Rectangle" ? 'checked' : ''}
          class="radio-group"
        />
          Rectangle
        <input
          type="radio"
          name="shapes"
          value="Circle"
          ${controlType === "Circle" ? 'checked': ''}
          class="radio-group"
        />
          Circle
        <input
          type="radio"
          name="shapes"
          value="Triangle"
          ${controlType === "Triangle" ? 'checked' : ''}
          class="radio-group"
        />
          Triangle
      <div>
    `;
  }
}

export default Controls;
