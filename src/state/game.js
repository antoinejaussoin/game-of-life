import { observable, computed, action } from 'mobx';
import Engine from '../engines/bw-engine';

export default class Game {
  @observable running = false;

  constructor() {
    this._engine = new Engine(1000);
  }

  @action start() {
    this.running = true;
  }

  @action stop() {
    this.running = false;
  }

  setImageData(imageData) {
    this._engine._imageData = imageData;
  }

  @computed get engine() {
    return this._engine;
  }
}