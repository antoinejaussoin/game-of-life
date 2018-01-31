import ColorEngine from './bw-engine';
import moment from 'moment';

const engine = new ColorEngine(1000, { data: [] });

const gen = 100;
const start = moment();

for (let i = 0; i < gen; i++) {
  engine.play();
  const x = engine.canvasArray.length;
}

const end = moment();

const elapsed = end.diff(start, 'ms');
const rate = gen / elapsed * 1000;

console.log('took: ', elapsed, 'ms, ', rate, ' /s');