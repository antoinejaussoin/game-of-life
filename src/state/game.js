import { observable, computed, action } from 'mobx';
import Engine from '../engines/bw-engine';
import { highLife } from '../engines/variations';

export default class Game {
  @observable running = false;

  constructor() {
    this._engine = new Engine(1000, highLife);
  }

  @action start() {
    this.running = true;
  }

  @action stop() {
    this.running = false;
  }

  @computed get engine() {
    return this._engine;
  }
}