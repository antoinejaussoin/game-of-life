import React, { Component } from 'react';
import Canvas from './components/Canvas';
import FPSStats from 'react-stats-zavatta';
import Button from './components/button';
import Slider from './components/slider';
import Dropdown from './components/dropdown';
import Checkbox from './components/checkbox';
import { observer } from 'mobx-react';
import { css } from 'emotion';

const header = css`
  display: flex;
  align-items: center;

  > * {
    margin-right: 20px;
  }
`;

const generation = css`
  font-size: 3em;
`

@observer
class App extends Component {
  render() {
    const { game } = this.props;
    return (
      <div>        
        <div className={header}>
          <Button onClick={() => game.running ? game.stop() : game.start()}>{game.running ? 'Stop': 'Start'}</Button>
          <Button onClick={() => game.reset() }>Reset</Button>
          <Slider label="Size" min={10} max={2000} value={game.size} onChange={v => game.changeSize(v)} />
          <Slider label="Fill %" min={0} max={100} value={game.fill} onChange={v => game.changeFill(v)} />
          <Dropdown label="Engine" value={game.engineType} options={game.engineTypes} onChange={v => game.changeEngineType(v)} />
          <Dropdown label="Variation" value={game.variation} options={game.variations} onChange={v => game.changeVariation(v)} />
          <Checkbox label="Pixelated" value={game.pixelated} onChange={() => game.togglePixelated()} />

          <FPSStats isActive={true} right={1} />
        </div>
        <Canvas engine={game.engine} running={game.running} pixelated={game.pixelated} />
      </div>
    );
  }
}

export default App;
