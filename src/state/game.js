import { observable, computed, action } from 'mobx';
import Engine from '../engines/bw-engine';
import { highLife } from '../engines/variations';

export default class Game {
  @observable running = false;
  @observable size = 1000;
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
    this.size = size;
    this.stop();
    this.engine = new Engine(this.size);
    this.engine.initToRandom(6);
  }
}