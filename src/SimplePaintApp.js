import BaseComponent from './Components/BaseComponent/BaseComponent.js';

class SimplePaintApp extends BaseComponent {
  constructor() {
    super();
  }

  render() {
    const appName = this.getAttribute('name');

    this.innerHTML = `
      <h1>${appName}</h1>
      <paint-controls></paint-controls>
      <div class="paint-block">
        <paint-area></paint-area>
        <paint-toolbar></paint-toolbar>
      </div>
    `;
  }
}

export default SimplePaintApp;
