import { observable, computed, action, extendObservable } from 'mobx';
import find from 'lodash/find';
import BlackAndWhiteEngine from '../engines/bw-engine';
import ColorEngine from '../engines/color-engine';
import { classic, highLife } from '../engines/variations';
import shapes from '../engines/shapes';

export default class Game {
  @observable running = false;
  @observable size = 1000;
  @observable fill = 50;
  @observable engine = null;
  @observable engineType = null;
  @observable variation = null;
  @observable shape = null;
  @observable pixelated = true;

  constructor() {
    this.engineType = this.engineTypes[0];
    this.variation = this.variations[0];
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
    this.engine = new this.engineType.type(this.size, this.variation.type);
    extendObservable(this.engine, { generation: 0});
    this.engine.initToRandom(this.fill);
  }

  @action changeEngineType(engineType) {
    this.engineType = engineType;
    this.reset();
  }

  @action changeVariation(variation) {
    this.variation = variation;
    this.reset();
  }

  @action changeShape(shape) {
    this.shape = shape;
  }

  @action togglePixelated() {
    this.pixelated = !this.pixelated;
  }

  @action insertShape(coords) {
    if (this.shape) {
      this.engine.inject(coords.x, coords.y, this.shape.shape);
    }
  }

  @computed get generation() {
    return this.engine.generation;
  }

  get engineTypeClass() {
    return this.engineType.type;
  }

  get engineTypes() {
    return [
      { value: 'BW', label: 'Black & White', type: BlackAndWhiteEngine },
      { value: 'Color', label: 'Colour', type: ColorEngine }
    ]
  }

  get variations() {
    return [
      { value: 'Classic', label: 'Conway\'s Classic ', type: classic },
      { value: 'HighLife', label: 'High Life', type: highLife }
    ]
  }

  get shapes() {
    return shapes;
  }
}