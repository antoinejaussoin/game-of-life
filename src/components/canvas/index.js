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
      const canvas = this.canvas;
      const size = engine.size;
      engine.register(canvas);
      engine.initToRandom(30);
      engine.draw();
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
