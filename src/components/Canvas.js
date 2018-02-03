import React, { Component } from 'react';
import './Canvas.css';
import { observer } from 'mobx-react';

@observer
class Canvas extends Component {
  componentDidMount() {
    const engine = this.props.engine;
    const size = engine.size;
    const canvas = this.canvas;
    const context = canvas.getContext('2d');
    context.imageSmoothingEnabled = true;
    canvas.height = size;
    canvas.width = size;
    this.imageData = context.getImageData(0, 0, size, size);

    const next = () => {
      const engine = this.props.engine;
      console.log('size: ', engine.size);
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

  render() {
    return (
      <div className="container">
        <canvas className="board" ref={(canvas) => this.canvas = canvas } style={{ imageRendering: this.props.pixelated ? 'pixelated': 'auto' }} />
      </div>
    );
  }
}

export default Canvas;
