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
    context.imageSmoothingEnabled = false;
    canvas.height = size;
    canvas.width = size;
    const imageData = context.getImageData(0, 0, size, size);
    engine.initToRandom(6);

    const next = () => {
      if (this.props.running) {
        engine.draw(imageData);
        context.putImageData(imageData, 0, 0);
        engine.play();
      }
      window.requestAnimationFrame(next);
    };

    next();
  }

  render() {
    return (
      <div className="container">
        <canvas className="board" ref={(canvas) => this.canvas = canvas } />
      </div>
    );
  }
}

export default Canvas;
