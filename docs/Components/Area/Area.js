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
      controlType: 'Rectangle',
      lastContext: {},
    });
  }

  getMousePositionOnCanvas(event) {
    const rect = this.querySelector('#paint-area').getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }

  updateArea(state) {
    this.setState(state, false);
  }

  getPaintArea() {
    const $paintArea = this.querySelector('#paint-area');
    const context = $paintArea.getContext("2d");
    context.clearRect(0, 0, $paintArea.width, $paintArea.height);
    context.beginPath();

    return context;
  }

  saveContext() {
    const {
      X,
      Y,
      iX,
      iY,
      rX,
      rY,
      rW,
      rH
    } = this.state;

    this.updateArea({
      lastContext: { X, Y, iX, iY, rX, rY, rW, rH }
    });
  }

  restoreContext() {
    const {
      X,
      Y,
      iX,
      iY,
      rX,
      rY,
      rW,
      rH
    } = this.state.lastContext;

    this.updateArea({ X, Y, iX, iY, rX, rY, rW, rH });
  }

  cleanArea(e) {
    this.saveContext();
    this.updateArea({ X: 0, Y: 0, iX: 0, iY: 0, rX: 0, rY: 0, rW: 0, rH: 0 });
    this.getPaintArea();
  }

  drawOutlineRectangle() {
    const context = this.getPaintArea();
    context.lineWidth = "1";
    context.strokeStyle = "grey";
    context.setLineDash([5, 3]);
    context.rect(this.state.rX, this.state.rY, this.state.rW, this.state.rH);
    context.stroke();
  };

  drawRectangle = () => {
    const context = this.getPaintArea();
    context.lineWidth = "4";
    context.fillStyle = "orange";
    context.setLineDash([]);
    context.rect(this.state.rX, this.state.rY, this.state.rW, this.state.rH);
    context.fill();
    this.saveContext();
  };

  onMouseMove = (event) => {
    const pos = this.getMousePositionOnCanvas(event);
    this.updateArea({
      X: pos.x,
      Y: pos.y,
      iX: this.state.iX,
      iY: this.state.iY,
      rX: Math.min(this.state.iX, pos.x),
      rY: Math.min(this.state.iY, pos.y),
      rW: this.state.iX ? Math.abs(this.state.iX - pos.x) : 0,
      rH: this.state.iY ? Math.abs(this.state.iY - pos.y) : 0,
    });
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
    this.updateArea({ X: 0, Y: 0, iX: 0, iY: 0, rX: 0, rY: 0, rW: 0, rH: 0 });
  };

  startDraw = (event) => {
    const pos = this.getMousePositionOnCanvas(event);
    this.updateArea({
      X: pos.x,
      Y: pos.y,
      iX: pos.x,
      iY: pos.y,
      rX: 0,
      rY: 0,
      rW: 0,
      rH: 0,
      mouseDown: true,
    });
  };

  endDraw = (event) => {
    if (this.state.iX && this.state.iY) {
      this.updateArea({ mouseDown: false });
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
    const context = this.getPaintArea();
    context.lineWidth = "4";
    context.fillStyle = "yellow";
    context.setLineDash([]);
    context.arc(this.state.rX, this.state.rY, 70, 0, 2 * Math.PI, false);
    context.fill();
    this.saveContext();
  };

  drawTriangle = () => {
    const context = this.getPaintArea();

    context.moveTo(100, 100);
    context.lineTo(100, 300);
    context.lineTo(200, 300);
    context.closePath();

    // the outline
    context.lineWidth = 10;

    // the fill color
    context.fillStyle = "green";
    context.fill();
    this.saveContext();
  };

  updateControlType = (e) => {
    this.updateArea({
      controlType: e.detail,
    });
  }

  drawSeparatedRectangle = () => {
    const coords = [
      [150, 50],
      [300, 50],
    ];
    const context = this.getPaintArea();

    for (let i = 0; i < coords.length; i++) {
      context.lineWidth = "4";
      context.fillStyle = "orange";
      context.setLineDash([]);
      context.rect(coords[i][0], coords[i][0], coords[i][1], coords[i][1]);
      context.fill();
    }
  };

  drawSeparatedCircles = () => {
    const coords = [
      [150, 50],
      [300, 95],
    ];
    const context = this.getPaintArea();
    
    for (let i = 0; i < coords.length; i++) {
      context.lineWidth = "4";
      context.setLineDash([]);
      context.fillStyle = "orange";
      context.arc(coords[i][0], coords[i][1], 30, 0, Math.PI * 2, true);
      context.fill();
    }
  };

  drawSeparatedTriangle = () => {
    const coords = [
      [150, 50],
      [300, 50],
    ];
    const coordsLine = [
      [200, 100],
      [300, 200],
    ];
    const moveTooLine = [
      [100, 100],
      [200, 200],
    ];
    const context = this.getPaintArea();

    for (let i = 0; i < coords.length; i++) {
      context.moveTo(moveTooLine[i][0], moveTooLine[i][1]);
      context.lineTo(coords[i][0], coords[i][1]);
      context.lineTo(coordsLine[i][0], coordsLine[i][0]);
      context.closePath();
      // the outline
      context.lineWidth = 10;
      // the fill color
      context.fillStyle = "green";
      context.fill();
    }
  };

  splitShape = () => {
    const {
      controlType,
    } = this.state;

    if (controlType === "Rectangle") {
      this.drawSeparatedRectangle();
    } else if (controlType === "Circle") {
      this.drawSeparatedCircles();
    } else if (controlType === "Triangle") {
      this.drawSeparatedTriangle();
    }
  };

  glueShape = (e) => {
    const {
      controlType,
    } = this.state;
    this.restoreContext();

    if (controlType === "Rectangle") {
      this.drawRectangle();
    } else if (controlType === "Circle") {
      this.drawCircle();
    } else if (controlType === "Triangle") {
      this.drawTriangle();
    }
  }

  onMount() {
    this.$paintArea = this.querySelector('#paint-area');
    this.$paintArea.addEventListener('mousemove', e => this.onMouseMove(e));
    this.$paintArea.addEventListener('mousedown', e => this.startDraw(e));
    this.$paintArea.addEventListener('mouseup', e => this.endDraw(e));
    this.$paintArea.addEventListener('mouseout', e => this.onMouseOut(e));

    // Receive the Control Type from Controls Component on Choosing Radio option.
    this.$app.addEventListener('onControlChange', e => this.updateControlType(e));

    // Receive the Action from ToolBar Component on click of `Eraser`.
    this.$app.addEventListener('onErase', e => this.cleanArea(e));

    // Receive the Action from ToolBar Component on click of `Scissor`.
    this.$app.addEventListener('onSplitShape', e => this.splitShape(e));

    // Receive the Action from ToolBar Component on click of `Glue`.
    this.$app.addEventListener('onGlueShape', e => this.glueShape(e));
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
