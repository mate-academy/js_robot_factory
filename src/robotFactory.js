'use strict';

const DEFAULT_COORD = 0;
const DEFAULT_STEP = 1;

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;
    this.chipVersion = chipVersion;

    this.coords = {
      x: coords.x || DEFAULT_COORD,
      y: coords.y || DEFAULT_COORD,
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
           + `Chip version: ${this.chipVersion}, `
           + `Weight: ${this.weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);

    this.coords.z = coords.z || DEFAULT_COORD;
  };

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
    currentLoad = null
  ) {
    super(name, weight, coords, chipVersion);

    this.currentLoad = currentLoad;
    this.maxLoadWeight = maxLoadWeight;
  };

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
