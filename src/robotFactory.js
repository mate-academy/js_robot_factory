'use strict';

const DEFAULT_STEP = 1;
const DEFAULT_COORDS = {
  x: 0,
  y: 0,
  z: 0,
};

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;
    this.chipVersion = chipVersion;

    this.coords = {
      x: coords.x || DEFAULT_COORDS.x,
      y: coords.y || DEFAULT_COORDS.y,
    };
  }

  goForward(step = DEFAULT_STEP) {
    this.coords.y += step;
  }

  goBack(step = DEFAULT_STEP) {
    this.coords.y -= step;
  }

  goRight(step = DEFAULT_STEP) {
    this.coords.x += step;
  }

  goLeft(step = DEFAULT_STEP) {
    this.coords.x -= step;
  }

  getInfo() {
    return `Robot: ${this.name}, `
      + `Chip version: ${this.chipVersion}, Weight: ${this.weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);

    this.coords.z = coords.z || DEFAULT_COORDS.z;
  }

  goUp(step = DEFAULT_STEP) {
    this.coords.z += step;
  }

  goDown(step = DEFAULT_STEP) {
    this.coords.z -= step;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(
    name,
    weight,
    coords,
    chipVersion,
    maxLoadWeight,
    currentLoad = null,
  ) {
    super(name, weight, coords, chipVersion);

    this.currentLoad = currentLoad;
    this.maxLoadWeight = maxLoadWeight;
  }

  hookLoad(cargo) {
    if (!this.currentLoad && cargo.weight <= this.maxLoadWeight) {
      this.currentLoad = cargo;
    }
  }

  unhookLoad() {
    this.currentLoad = null;
  }
}

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
