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
    const size = engine.size;
    const canvas = this.canvas;
    const context = canvas.getContext('2d');
    context.imageSmoothingEnabled = true;
    canvas.height = size;
    canvas.width = size;
    this.imageData = context.getImageData(0, 0, size, size);
    engine.draw(this.imageData);
    context.putImageData(this.imageData, 0, 0);

    const next = () => {
      const engine = this.props.engine;
      if (this.props.running) {
        engine.draw(this.imageData);
        context.putImageData(this.imageData, 0, 0);
        engine.play();
      }
      window.requestAnimationFrame(next);
    };

    next();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.engine !== nextProps.engine) {
      const engine = nextProps.engine;
      const canvas = this.canvas;
      const size = engine.size;
      const context = canvas.getContext('2d');
      context.imageSmoothingEnabled = false;
      canvas.height = size;
      canvas.width = size;
      this.imageData = context.getImageData(0, 0, size, size);
      engine.draw(this.imageData);
      context.putImageData(this.imageData, 0, 0);
    }
  }

  onCanvasClick(e) {
    const coords = this.canvas.relMouseCoords(e);
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
          ref={(canvas) => this.canvas = canvas }
          style={{ imageRendering: this.props.pixelated ? 'pixelated': 'auto' }}
        />
      </div>
    );
  }
}

export default Canvas;
