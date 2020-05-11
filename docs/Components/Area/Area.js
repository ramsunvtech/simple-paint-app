import BaseComponent from '../BaseComponent/BaseComponent.js';

class Area extends BaseComponent {
  constructor() {
    super({
      X: 0,
      Y: 0,
      iX: 0,
      iY: 0,
      rX: 0,
      rY: 0,
      rW: 0,
      rH: 0,
      mouseDown: false,
      controlType: 'Rectangle'
    });
  }

  getMousePositionOnCanvas(event) {
    const rect = this.querySelector('#paint-area').getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }

  drawOutlineRectangle() {
    const $paintArea = this.querySelector('#paint-area');
    const context = $paintArea.getContext("2d");
    context.clearRect(0, 0, $paintArea.width, $paintArea.height);
    context.beginPath();
    context.lineWidth = "1";
    context.strokeStyle = "grey";
    context.setLineDash([5, 3]);
    context.rect(this.state.rX, this.state.rY, this.state.rW, this.state.rH);
    context.stroke();
  };

  drawRectangle = () => {
    const $paintArea = this.querySelector('#paint-area');
    const context = $paintArea.getContext("2d");
    context.clearRect(0, 0, $paintArea.width, $paintArea.height);
    context.beginPath();
    context.lineWidth = "4";
    context.fillStyle = "green";
    context.setLineDash([]);
    context.rect(this.state.rX, this.state.rY, this.state.rW, this.state.rH);
    context.fill();
  };

  onMouseMove = (event) => {
    const pos = this.getMousePositionOnCanvas(event);
    this.setState({
      X: pos.x,
      Y: pos.y,
      iX: this.state.iX,
      iY: this.state.iY,
      rX: Math.min(this.state.iX, pos.x),
      rY: Math.min(this.state.iY, pos.y),
      rW: this.state.iX ? Math.abs(this.state.iX - pos.x) : 0,
      rH: this.state.iY ? Math.abs(this.state.iY - pos.y) : 0,
    }, false);
    const {
      mouseDown,
      controlType,
    } = this.state;

    if (mouseDown) {
      if (controlType === "Rectangle") {
        this.drawOutlineRectangle();
      } else if (controlType === "Circle") {
        this.drawCircle();
      } else if (controlType === "Triangle") {
        this.drawTriangle();
      }
    }
  };

  onMouseOut = (event) => {
    this.setState({ X: 0, Y: 0, iX: 0, iY: 0, rX: 0, rY: 0, rW: 0, rH: 0 }, false);
  };

  startDraw = (event) => {
    const pos = this.getMousePositionOnCanvas(event);
    this.setState({
      X: pos.x,
      Y: pos.y,
      iX: pos.x,
      iY: pos.y,
      rX: 0,
      rY: 0,
      rW: 0,
      rH: 0,
      mouseDown: true,
    }, false);
  };

  endDraw = (event) => {
    if (this.state.iX && this.state.iY) {
      this.setState({ mouseDown: false }, false);
      const {
        controlType,
      } = this.state;

      if (controlType === "Rectangle") {
        this.drawRectangle();
      } else if (controlType === "Circle") {
        this.drawCircle();
      } else if (controlType === "Triangle") {
        this.drawTriangle();
      }
    }
  };

  drawCircle = () => {
    const $paintArea = this.querySelector('#paint-area');
    const context = $paintArea.getContext("2d");
    context.clearRect(0, 0, $paintArea.width, $paintArea.height);
    context.beginPath();
    context.lineWidth = "4";
    context.fillStyle = "orange";
    context.setLineDash([]);
    context.arc(this.state.rX, this.state.rY, 70, 0, 2 * Math.PI, false);
    context.fill();
  };

  drawTriangle = () => {
    const $paintArea = this.querySelector('#paint-area');
    const context = $paintArea.getContext("2d");
    context.clearRect(0, 0, $paintArea.width, $paintArea.height);
    context.beginPath();

    context.moveTo(100, 100);
    context.lineTo(100, 300);
    context.lineTo(200, 300);
    context.closePath();

    // the outline
    context.lineWidth = 10;

    // the fill color
    context.fillStyle = "green";
    context.fill();
  };

  updateArea = (e) => {
    this.setState({
      controlType: e.detail,
    }, false);
  }

  onMount() {
    this.$paintArea = this.querySelector('#paint-area');
    this.$paintArea.addEventListener('mousemove', e => this.onMouseMove(e));
    this.$paintArea.addEventListener('mousedown', e => this.startDraw(e));
    this.$paintArea.addEventListener('mouseup', e => this.endDraw(e));
    this.$paintArea.addEventListener('mouseout', e => this.onMouseOut(e));

    this.$app.addEventListener('onControlChange', e => this.updateArea(e));
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
