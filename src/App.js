import React, { Component } from 'react';
import Canvas from './components/Canvas';
import FPSStats from 'react-stats-zavatta';
import Button from './components/button';
import Slider from './components/slider';
import Dropdown from './components/dropdown';
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
          <Slider label="Size" min={10} max={2000} value={game.size} onChange={v => game.changeSize(v)} />
          <Slider label="Fill" min={0} max={100} value={game.fill} onChange={v => game.changeFill(v)} />
          <Dropdown label="Engine" value={game.selectedEngineOption} options={game.engines} onChange={v => game.changeEngine(v.type)} />
          <FPSStats isActive={true} right={1} />
        </div>
        <Canvas engine={game.engine} running={game.running} />
      </div>
    );
  }
}

export default App;