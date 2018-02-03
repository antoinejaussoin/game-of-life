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
    engine.register(canvas);
    engine.initToRandom(30);
    // const context = canvas.getContext('2d');
    // context.imageSmoothingEnabled = true;
    // canvas.height = size;
    // canvas.width = size;
    // this.imageData = context.getImageData(0, 0, size, size);
    engine.draw();
    //context.putImageData(this.imageData, 0, 0);

    const next = () => {
      const engine = this.props.engine;
      if (this.props.running) {
        engine.draw();
        //context.putImageData(this.imageData, 0, 0);
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
      // const context = canvas.getContext('2d');
      // context.imageSmoothingEnabled = false;
      // canvas.height = size;
      // canvas.width = size;
      console.log('canvas: ', canvas);
      engine.register(canvas);
      engine.initToRandom(30);
      
      //this.imageData = context.getImageData(0, 0, size, size);
      engine.draw();
      //context.putImageData(this.imageData, 0, 0);
    }
  }

  onCanvasClick(e) {
    const coords = this.canvas.relMouseCoords(e);
    if (this.props.onClick) {
      this.props.onClick(coords);
    }
  }
//style={{ imageRendering: this.props.pixelated ? 'pixelated': 'auto' }}
  render() {
    return (
      <div className="container">
        <canvas
          className="board"
          onClick={this.onCanvasClick}
          ref={(canvas) => this.canvas = canvas }
          
        />
      </div>
    );
  }
}

export default Canvas;
