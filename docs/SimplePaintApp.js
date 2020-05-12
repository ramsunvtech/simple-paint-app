import BaseComponent from './Components/BaseComponent/BaseComponent.js';

class SimplePaintApp extends BaseComponent {
  constructor() {
    super({
      config: {
        paintArea: {
          width: 400,
          height: 300
        },
        addEraser: false,
        addScissor: false,
        addGlue: false
      }
    });

    // Get the dimension of the canvas and the list of defined toolbar.
    this.getAppConfig();
  }

  async getAppConfig() {
    const {
      apiEndpoint,
    } = this.state;

    const configResponse = await fetch(`${apiEndpoint}/config`);
    const config = await configResponse.json();

    this.setState({ config });
  }

  render() {
    const appName = this.getAttribute('name');
    const {
      config: {
        paintArea,
        addEraser,
        addScissor,
        addGlue,
      }
    } = this.state;

    this.innerHTML = `
      <h1>${appName}</h1>
      <paint-controls></paint-controls>
      <div class="paint-block">
        <paint-area
          width="${paintArea.width}"
          height="${paintArea.height}"
        ></paint-area>
        <paint-toolbar
          eraser="${addEraser}"
          scissor="${addScissor}"
          glue="${addGlue}"
        >
        </paint-toolbar>
      </div>
    `;
  }
}

export default SimplePaintApp;
