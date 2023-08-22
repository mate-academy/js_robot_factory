'use strict';

const BASIC_STEP = 1;
const STARTING_COORDS = {
  x: 0,
  y: 0,
  z: 0,
};

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;

    this.coords = {
      x: coords.x || STARTING_COORDS.x,
      y: coords.y || STARTING_COORDS.y,
    };

    this.chipVersion = chipVersion;
  }

  goForward(step = BASIC_STEP) {
    this.coords.y += step;
  }

  goBack(step = BASIC_STEP) {
    this.coords.y -= step;
  }

  goRight(step = BASIC_STEP) {
    this.coords.x += step;
  }

  goLeft(step = BASIC_STEP) {
    this.coords.x -= step;
  }

  getInfo() {
    return `Robot: ${this.name}, Chip version: ${this.chipVersion}, Weight: ${
      this.weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);

    this.coords.z = coords.z || STARTING_COORDS.z;
  }

  goUp(step = BASIC_STEP) {
    this.coords.z += step;
  }

  goDown(step = BASIC_STEP) {
    this.coords.z -= step;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, coords, chipVersion, maxLoadWeight,
    currentLoad = null) {
    super(name, weight, coords, chipVersion);
    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  }

  hookLoad(cargo) {
    if (cargo.weight <= this.maxLoadWeight && !this.currentLoad) {
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
