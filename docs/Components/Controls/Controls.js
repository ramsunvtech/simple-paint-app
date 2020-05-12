import BaseComponent from '../BaseComponent/BaseComponent.js';

import {
  RECTANGLE,
  CIRCLE,
  TRIANGLE,
} from '../../Constants.js';

class Controls extends BaseComponent {
  constructor() {
    super({
      controlType: RECTANGLE,
    });
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
          value="${RECTANGLE}"
          ${controlType === RECTANGLE ? 'checked' : ''}
          class="radio-group"
        />
          ${RECTANGLE}
        <input
          type="radio"
          name="shapes"
          value="${CIRCLE}"
          ${controlType === CIRCLE ? 'checked': ''}
          class="radio-group"
        />
          ${CIRCLE}
        <input
          type="radio"
          name="shapes"
          value="${TRIANGLE}"
          ${controlType === TRIANGLE ? 'checked' : ''}
          class="radio-group"
        />
          ${TRIANGLE}
      <div>
    `;
  }
}

export default Controls;
