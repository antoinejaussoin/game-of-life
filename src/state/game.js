import { observable, computed, action } from 'mobx';
import Engine from '../engines/bw-engine';
import { highLife } from '../engines/variations';

export default class Game {
  @observable running = false;
  @observable size = 1000;
  @observable fill = 50;
  @observable engine = null;

  constructor() {
    this.changeSize(this.size);
  }

  @action start() {
    this.running = true;
  }

  @action stop() {
    this.running = false;
  }

  @action changeSize(size) {
    this.stop();
    this.size = size;
    this.engine = new Engine(this.size);
    this.engine.initToRandom(this.fill);
  }

  @action changeFill(fill) {
    this.stop();
    this.fill = fill;
    this.engine = new Engine(this.size);
    this.engine.initToRandom(this.fill);
  }
}