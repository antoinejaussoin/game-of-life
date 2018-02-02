import React, { Component } from 'react';
import Canvas from './components/Canvas';
import FPSStats from 'react-stats-zavatta';
import Button from './components/button';
import Slider from './components/slider';
import { observer } from 'mobx-react';
import { css } from 'emotion';

const header = css`
  display: flex;
  align-items: center;

  > * {
    margin-right: 20px;
  }
`;

@observer
class App extends Component {
  render() {
    const { game } = this.props;
    return (
      <div>
        
        <div className={header}>
          <Button bsStyle="primary" bsSize="large" onClick={() => game.running ? game.stop() : game.start()}>{game.running ? 'Stop': 'Start'}</Button>
          <Slider min={10} max={2000} value={game.size} onChange={v => game.changeSize(v)} />
          <div>{game.size}x{game.size}</div>
          <FPSStats isActive={true} right={1} />
        </div>
        <Canvas engine={game.engine} running={game.running} />
      </div>
    );
  }
}

export default App;
