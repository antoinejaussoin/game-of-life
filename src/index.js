import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Game from './state/game';

const game = new Game();

ReactDOM.render(<App game={game} />, document.getElementById('root'));
registerServiceWorker();
