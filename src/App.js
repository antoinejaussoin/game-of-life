import React, { Component } from 'react';
import Canvas from './components/canvas';
import FPSStats from 'react-stats-zavatta';
import Button from './components/button';
import Slider from './components/slider';
import Dropdown from './components/dropdown';
import Checkbox from './components/checkbox';
import Shape from './components/shape';
import { addMargins } from './engines/shapes'
import { observer } from 'mobx-react';
import styled, { css } from 'react-emotion';

const header = css`
  display: flex;
  align-items: center;

  > * {
    margin-right: 20px;
  }
`;

const Generation = styled('div')`
  font-size: 3em;
`;

const Container = styled('div')`
  display: flex;
`;

const Left = styled('div')`
  flex: 1;
`;

const Right = styled('div')`
  width: 300px;
  padding: 20px;
`;

@observer
class App extends Component {
  render() {
    const { game } = this.props;
    return (
      <div>        
        <div className={header}>
          <Button onClick={() => game.running ? game.stop() : game.start()}>{game.running ? 'Stop': 'Start'}</Button>
          <Button onClick={() => game.reset() }>Reset</Button>
          <Slider label="Size" min={10} max={8192} value={game.size} onChange={v => game.changeSize(v)} />
          <Slider label="Fill %" min={0} max={100} value={game.fill} onChange={v => game.changeFill(v)} />
          <Dropdown label="Engine" value={game.engineType} options={game.engineTypes} onChange={v => game.changeEngineType(v)} />
          <Dropdown label="Variation" value={game.variation} options={game.variations} onChange={v => game.changeVariation(v)} />
          <Checkbox label="Pixelated" value={game.pixelated} onChange={() => game.togglePixelated()} />
          <Generation>{game.generation}</Generation>
          <FPSStats isActive={true} right={1} />
        </div>
        <Container>
          <Left>
            <Canvas
              engine={game.engine}
              running={game.running}
              pixelated={game.pixelated}
              onClick={coords => game.insertShape(coords)}
            />
          </Left>
          <Right>
            {game.shapes.map(shape => (
              <Shape
                key={shape.name}
                name={shape.name}
                selected={game.shape && game.shape.name === shape.name}
                onClick={() => game.changeShape(shape)}
                shape={addMargins(1)(shape.shape)}
              />
            ))}
          </Right>
        </Container>
      </div>
    );
  }
}

export default App;
