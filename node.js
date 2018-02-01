import ColorEngine from './color-engine';
import moment from 'moment';

const array = { data: new Uint8ClampedArray() };

const engine = new ColorEngine(1000, array);
engine.initToRandom(60);

const gen = 1000;
const start = moment();

for (let i = 0; i < gen; i++) {
  engine.play();
  engine.draw();
  if (i % 10 === 0) {
    const end = moment();
    const elapsed = end.diff(start, 'ms');
    const rate = i / elapsed * 1000;
    console.log('Pending: ', elapsed, 'ms, ', rate, ' /s');
  }
}

const end = moment();

const elapsed = end.diff(start, 'ms');
const rate = gen / elapsed * 1000;

console.log('took: ', elapsed, 'ms, ', rate, ' /s');