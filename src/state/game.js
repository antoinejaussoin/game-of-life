import { observable, computed, action } from 'mobx';
import find from 'lodash/find';
import BlackAndWhiteEngine from '../engines/bw-engine';
import ColorEngine from '../engines/color-engine';
import { highLife } from '../engines/variations';

export default class Game {
  @observable running = false;
  @observable size = 1000;
  @observable fill = 50;
  @observable engine = null;
  @observable engineType = BlackAndWhiteEngine;

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
    this.reset();
  }

  @action changeFill(fill) {
    this.fill = fill;
    this.reset();
  }

  @action reset() {
    this.stop();
    this.engine = new this.engineType(this.size);
    this.engine.initToRandom(this.fill);
  }

  @action changeEngine(engineType) {
    this.engineType = engineType;
    this.reset();
  }

  @computed get selectedEngineOption() {
    return find(this.engines, { type: this.engineType }).value;
  }

  get engines() {
    return [
      { value: 'BW', label: 'Black & White', type: BlackAndWhiteEngine },
      { value: 'Color', label: 'Colour', type: ColorEngine }
    ]
  }
}