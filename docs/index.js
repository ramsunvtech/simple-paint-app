import Area from './Components/Area/Area.js';
import ToolBar from './Components/ToolBar/ToolBar.js';
import Controls from './Components/Controls/Controls.js';
import SimplePaintApp from './SimplePaintApp.js';

// Add Custom Elements Once Document is Ready.
document.addEventListener('readystatechange', event => {
  if (event.target.readyState === 'complete') {
    customElements.define('paint-controls', Controls);
    customElements.define('paint-area', Area);
    customElements.define('paint-toolbar', ToolBar);
    customElements.define('simple-paint-app', SimplePaintApp);
  }
});
