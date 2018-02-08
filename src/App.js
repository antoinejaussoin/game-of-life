import React, { Component } from 'react';
import Canvas from './components/canvas';
import FPSStats from 'react-stats-zavatta';
import ControlButton from './components/button/control';
import Button from './components/button';
import Slider from './components/slider';
import Dropdown from './components/dropdown';
import Checkbox from './components/checkbox';
import Counter from './components/counter';
import Shape from './components/shape';
import { addMargins } from './engines/shapes'
import { observer } from 'mobx-react';
import styled, { css } from 'react-emotion';
import FontAwesome from 'react-fontawesome';

const Header = styled('div')`
  display: flex;
  align-items: center;
  margin-left: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const Section = styled('section')`
  margin: 0 20px;
  display: flex;
  > * {
    margin-right: 20px;
  }
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
        <Header>
          <Section>
            <ControlButton onClick={() => game.running ? game.stop() : game.start()} icon={game.running ? 'pause': 'play'} label="Starts/Stops the simulation" color="#43a047" />
            <ControlButton onClick={() => game.step() } icon="step-forward" label="Simulates one step" disabled={!game.canRunStep} color="#81c784" />
            <ControlButton onClick={() => game.reset() } icon="undo" label="Reset to the beginning" color="#e53935" />
            <ControlButton onClick={() => game.clear() } icon="eraser" label="Clears the whole board" color="#e53935" />
          </Section>
          <Section>
            <Slider label={`Size ${game.size}px`} min={5} max={14} value={game.sizePower} onChange={v => game.changeSize(v)} />
            <Slider label={`Fill ${game.fill}%`} min={0} max={100} value={game.fill} onChange={v => game.changeFill(v)} />
            <Slider label={`Speed ${game.speed}x`} min={1} max={100} value={game.speed} onChange={v => game.changeSpeed(v)} />
          </Section>
          <Section>
            <Dropdown label="Engine" value={game.engineType} options={game.engineTypes} onChange={v => game.changeEngineType(v)} />
            <Dropdown label="Variation" value={game.variation} options={game.variations} onChange={v => game.changeVariation(v)} />
            <Dropdown label="Scenario" value={game.scenario} options={game.scenarios} onChange={v => game.changeScenario(v)} />
            <Checkbox label="Pixelated" value={game.pixelated} onChange={() => game.togglePixelated()} />
          </Section>
          <Section>
            <Counter count={game} />
          </Section>
          <FPSStats isActive={true} right={1} bottom={1} />
        </Header>
        <Container>
          <Left>
            <Canvas
              engine={game.engine}
              running={game.running}
              pixelated={game.pixelated}
              speed={game.speed}
              scenario={game.scenario}
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
