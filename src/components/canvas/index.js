import React, { Component } from 'react';
import './Canvas.css';
import './utils';
import { observer } from 'mobx-react';

@observer
class Canvas extends Component {
  constructor(props) {
    super(props);
    this.onCanvasClick = this.onCanvasClick.bind(this);
  }
  componentDidMount() {
    const engine = this.props.engine;
    const canvas = this.activeCanvas;
    engine.register(canvas);
    engine.initToRandom();
    engine.draw();
    
    const next = () => {
      const engine = this.props.engine;
      if (this.props.running) {
        engine.play();
        engine.draw();
      }
      window.requestAnimationFrame(next);
    };

    next();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.engine !== nextProps.engine) {
      const engine = nextProps.engine;
      const canvas = engine.isWebgl ? this.webGlCanvas : this.canvas;
      engine.register(canvas);
      engine.initToRandom();
      engine.draw();
    }
  }

  get activeCanvas() {
    const engine = this.props.engine;
    const canvas = engine.isWebgl ? this.webGlCanvas : this.canvas;
    return canvas;
  }

  onCanvasClick(e) {
    const coords = this.activeCanvas.relMouseCoords(e);
    if (this.props.onClick) {
      this.props.onClick(coords);
    }
  }

  render() {
    return (
      <div className="container">
          <canvas
            className="board"
            onClick={this.onCanvasClick}
            ref={(canvas) => this.webGlCanvas = canvas }
            style={{ imageRendering: this.props.pixelated ? 'pixelated': 'auto', display: this.props.engine.isWebgl ? 'block' : 'none' }}
          />
          <canvas
            className="board"
            onClick={this.onCanvasClick}
            ref={(canvas) => this.canvas = canvas }
            style={{ imageRendering: this.props.pixelated ? 'pixelated': 'auto', display: !this.props.engine.isWebgl ? 'block' : 'none' }}
          />
        }
      </div>
    );
  }
}

export default Canvas;
