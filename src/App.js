import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Canvas from './components/Canvas';
import FPSStats from 'react-stats-zavatta';
import { observer } from 'mobx-react';

@observer
class App extends Component {
  render() {
    const { game } = this.props;
    return (
      <div>
        
        <button onClick={() => game.running ? game.stop() : game.start()}>{game.running ? 'Stop': 'Start'}</button>
        <Canvas engine={game.engine} running={game.running} />
        <FPSStats isActive={true} right />
      </div>
    );
  }
}

export default App;
