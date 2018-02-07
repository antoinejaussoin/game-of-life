import { observable, computed, action, extendObservable, reaction } from 'mobx';
import debounce from 'lodash/debounce';
import BlackAndWhiteEngine from '../engines/bw-engine';
import ColorEngine from '../engines/color-engine';
import WebGlEngine from '../engines/webgl/webgl-engine';
import WebGlColorEngine from '../engines/webgl/webgl-color-engine';
import { classic, highLife } from '../engines/variations';
import shapes from '../engines/shapes';
import scenarios from '../engines/scenarios';

export default class Game {
  @observable running = false;
  @observable sizePower = 10;
  @observable fill = 20;
  @observable engine = null;
  @observable engineType = null;
  @observable variation = null;
  @observable shape = null;
  @observable scenario = null;
  @observable pixelated = true;
  @observable speed = 1;

  constructor() {
    this.engineType = this.engineTypes[3];
    this.variation = this.variations[0];
    this.scenario = this.scenarios[0];
    this.reset();

    const debouncedReset = debounce(this.reset.bind(this), 800);

    reaction(
      () => ({
        engineType: this.engineType,
        fill: this.fill,
        size: this.size,
        variation: this.variation
      }),
      debouncedReset
    );
  }

  @action start() {
    this.running = true;
  }

  @action stop() {
    this.running = false;
  }

  @action changeSize(sizePower) {
    this.sizePower = sizePower;
  }

  @action changeFill(fill) {
    this.fill = fill;
  }

  @action reset() {
    this.stop();
    this.engine = new this.engineType.type(this.size, this.fill, this.variation.type);
    extendObservable(this.engine, { generation: 0});
  }

  @action clear() {
    this.engine.initToBlank();
    this.engine.draw();
  }

  @action changeEngineType(engineType) {
    this.engineType = engineType;
  }

  @action changeVariation(variation) {
    this.variation = variation;
  }

  @action changeShape(shape) {
    this.shape = shape;
  }

  @action changeScenario(scenario) {
    this.stop();
    this.scenario = scenario;
    this.scenario.init(this.engine);
    this.engine.draw();
  }

  @action changeSpeed(speed) {
    this.speed = speed;
  }

  @action togglePixelated() {
    this.pixelated = !this.pixelated;
  }

  @action insertShape(coords) {
    if (this.shape) {
      this.engine.inject(coords.x, coords.y, this.shape.shape);
      this.engine.draw();
    }
  }

  @computed get generation() {
    return this.engine.generation;
  }

  @computed get size() {
    return Math.pow(2, this.sizePower);
  }

  get engineTypeClass() {
    return this.engineType.type;
  }

  get engineTypes() {
    return [
      { value: 'BW', label: 'Black & White', type: BlackAndWhiteEngine },
      { value: 'Color', label: 'Colour', type: ColorEngine },
      { value: 'WebGL', label: 'WebGL', type: WebGlEngine },
      { value: 'WebGLColor', label: 'WebGL Colour', type: WebGlColorEngine }
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

  get scenarios() {
    return scenarios.map(s => ({
      value: s.name,
      label: s.name,
      init: s.init
    }));
  }
}